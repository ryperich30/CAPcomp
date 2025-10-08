import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ---------- helpers ----------
function fmtHeight(heightIn?: number | null) {
  if (!heightIn || heightIn <= 0) return ''
  const ft = Math.floor(heightIn / 12)
  const inch = heightIn % 12
  return `${ft}' ${inch}"`
}
function calcAge(b?: string | null) {
  if (!b) return ''
  const dob = new Date(b)
  const now = new Date()
  let age = now.getFullYear() - dob.getFullYear()
  const m = now.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--
  return String(age)
}
function fmtBirthday(b?: string | null) {
  if (!b) return ''
  const d = new Date(b)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(-2)
  return `${mm}/${dd}/${yy}`
}
const th: React.CSSProperties = { textAlign:'left', borderBottom:'1px solid var(--border)', padding:'8px', whiteSpace:'nowrap' }
const td: React.CSSProperties = { borderBottom:'1px solid var(--border)', padding:'8px', whiteSpace:'nowrap' }
const dash = (v:any)=> (v===null||v===undefined||v==='')?'-':String(v)

// Forward group if any of C/LW/RW is present in the (possibly comma-separated) position string
function posGroup(position?: string | null) {
  if (!position) return 9
  const parts = position.split(',').map(s => s.trim().toUpperCase())
  const isF = parts.some(p => p === 'C' || p === 'LW' || p === 'RW')
  const isD = parts.some(p => p === 'D')
  const isG = parts.some(p => p === 'G')
  if (isF && !isD && !isG) return 0  // Forwards
  if (isD && !isG) return 1          // Defense
  if (isG) return 2                  // Goalies
  // mixed/unknown falls last
  return 9
}

export default async function RosterTable({ teamId, season }:{ teamId:number; season:string }) {
  const { data, error } = await supabase
    .from('team_roster')
    .select(`
      id,status,
      players:player_id (
        first_name,last_name,number,nationality,height_in,weight_lb,shoots,position,
        birthdate,draft_round,overall_pick,draft_year
      )
    `)
    .eq('team_id', teamId)
    .eq('season', season)

  if (error) return <p>Error: {error.message}</p>
  if (!data?.length) return <p>No roster yet for {season}.</p>

  // Client-side ordering:
  // 1) Forwards (C/LW/RW & combos) A→Z (last, first)
  // 2) Defense (D) A→Z
  // 3) Goalies (G) A→Z
  const ordered = data.slice().sort((a:any, b:any) => {
    const ga = posGroup(a.players?.position)
    const gb = posGroup(b.players?.position)
    if (ga !== gb) return ga - gb
    const la = (a.players?.last_name || '').toUpperCase()
    const lb = (b.players?.last_name || '').toUpperCase()
    if (la !== lb) return la.localeCompare(lb)
    const fa = (a.players?.first_name || '').toUpperCase()
    const fb = (b.players?.first_name || '').toUpperCase()
    if (fa !== fb) return fa.localeCompare(fb)
    // tie-breaker by jersey number if present
    const na = a.players?.number ?? 9999
    const nb = b.players?.number ?? 9999
    return na - nb
  })

  return (
    <div style={{ overflowX:'auto' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', marginTop:8 }}>
        <thead>
          <tr>
            <th style={th}>Last</th>
            <th style={th}>First</th>
            <th style={th}>#</th>
            <th style={th}>Nat</th>
            <th style={th}>Ht</th>
            <th style={th}>Wt</th>
            <th style={th}>Shoots</th>
            <th style={th}>Pos</th>
            <th style={th}>Birthday</th>
            <th style={th}>Age</th>
            <th style={th}>Draft Rd</th>
            <th style={th}>Overall</th>
            <th style={th}>Draft Yr</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((row:any, idx:number) => {
            const p = row.players
            const zebra = (idx % 2 === 0.04)
              ? { background: 'var(--card)', boxShadow: 'inset 0 0 0 9999px rgba(0,0,0,0.02)' }
              : undefined
            return (
              <tr key={row.id} style={zebra}>
                <td style={td}>{dash(p?.last_name)}</td>
                <td style={td}>{dash(p?.first_name)}</td>
                <td style={td}>{dash(p?.number)}</td>
                <td style={td}>{dash(p?.nationality)}</td>
                <td style={td}>{dash(fmtHeight(p?.height_in))}</td>
                <td style={td}>{dash(p?.weight_lb)}</td>
                <td style={td}>{dash(p?.shoots)}</td>
                <td style={td}>{dash(p?.position)}</td>
                <td style={td}>{dash(fmtBirthday(p?.birthdate))}</td>
                <td style={td}>{dash(calcAge(p?.birthdate))}</td>
                <td style={td}>{dash(p?.draft_round)}</td>
                <td style={td}>{dash(p?.overall_pick)}</td>
                <td style={td}>{dash(p?.draft_year)}</td>
                <td style={td}>{dash(row.status)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
