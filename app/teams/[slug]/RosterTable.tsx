import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Helpers
function fmtHeight(heightIn?: number | null) {
  if (!heightIn || heightIn <= 0) return ''
  const ft = Math.floor(heightIn / 12)
  const inch = heightIn % 12
  return `${ft}' ${inch}"`
}

function calcAge(birthdate?: string | null) {
  if (!birthdate) return ''
  const dob = new Date(birthdate)
  const now = new Date()
  let age = now.getFullYear() - dob.getFullYear()
  const m = now.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--
  return String(age)
}

function fmtBirthday(birthdate?: string | null) {
  if (!birthdate) return ''
  const d = new Date(birthdate)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(-2) // YY
  return `${mm}/${dd}/${yy}`
}

function dashIfNull<T>(v: T | null | undefined) {
  return (v === null || v === undefined || v === '') ? '-' : String(v)
}

export default async function RosterTable({ teamId, season }:{ teamId:number; season:string }) {
  const { data, error } = await supabase
    .from('team_roster')
    .select(`
      id,
      status,
      players:player_id (
        first_name, last_name, number,
        nationality, height_in, weight_lb,
        shoots, position,
        birthdate,
        draft_round, overall_pick, draft_year
      )
    `)
    .eq('team_id', teamId)
    .eq('season', season)
    .order('status', { ascending: true })
    .order('position', { foreignTable: 'players', ascending: true })
    .order('number', { foreignTable: 'players', ascending: true })

  if (error) return <p>Error: {error.message}</p>
  if (!data?.length) return <p>No roster yet for {season}.</p>

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
          {data.map((row:any) => {
            const p = row.players
            return (
              <tr key={row.id}>
                <td style={td}>{dashIfNull(p?.last_name)}</td>
                <td style={td}>{dashIfNull(p?.first_name)}</td>
                <td style={td}>{dashIfNull(p?.number)}</td>
                <td style={td}>{dashIfNull(p?.nationality)}</td>
                <td style={td}>{dashIfNull(fmtHeight(p?.height_in))}</td>
                <td style={td}>{dashIfNull(p?.weight_lb)}</td>
                <td style={td}>{dashIfNull(p?.shoots)}</td>
                <td style={td}>{dashIfNull(p?.position)}</td>
                <td style={td}>{dashIfNull(fmtBirthday(p?.birthdate))}</td>
                <td style={td}>{dashIfNull(calcAge(p?.birthdate))}</td>
                <td style={td}>{dashIfNull(p?.draft_round)}</td>
                <td style={td}>{dashIfNull(p?.overall_pick)}</td>
                <td style={td}>{dashIfNull(p?.draft_year)}</td>
                <td style={td}>{dashIfNull(row.status)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const th: React.CSSProperties = { textAlign:'left', borderBottom:'1px solid var(--border)', padding:'8px', whiteSpace:'nowrap' }
const td: React.CSSProperties = { borderBottom:'1px solid var(--border)', padding:'8px', whiteSpace:'nowrap' }
