import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// explicit logo paths (match filenames in /public/logos)
const leagueLogos: Record<string, string> = {
  nhl: '/logos/NHL.png',
  ahl: '/logos/AHL.png',
  echl: '/logos/ECHL.png',
}

// force order: NHL -> AHL -> ECHL
const leagueOrder: Record<string, number> = { nhl: 1, ahl: 2, echl: 3 }

export default async function HomePage() {
  const { data: leagues } = await supabase
    .from('leagues')
    .select('code,name')

  const ordered = (leagues ?? []).slice().sort((a: any, b: any) => {
    return (leagueOrder[a.code] ?? 99) - (leagueOrder[b.code] ?? 99)
  })

  return (
    <main style={{ padding: 24 }}>
      {/* Centered CAPcomp logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Image
          src="/capcomp-logo.png"
          alt="CAPcomp Logo"
          width={300}
          height={100}
          style={{ width: '100%', maxWidth: 300, height: 'auto' }}
          priority
        />
      </div>

      <h2>Leagues</h2>

      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))',
        }}
      >
        {ordered.map((l: any) => {
          const src = leagueLogos[l.code]
          return (
            <Link
              key={l.code}
              href={`/league/${l.code}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                border: '1px solid #eee',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt={`${l.name} logo`}
                  style={{ height: 32, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              ) : null}
              <span style={{ fontSize: 18 }}>{l.name}</span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
