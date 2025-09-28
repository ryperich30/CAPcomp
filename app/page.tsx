import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const leagueLogos: Record<string,string> = {
  nhl:'/logos/NHL.png',
  ahl:'/logos/AHL.png',
  echl:'/logos/ECHL.png',
}
const leagueOrder: Record<string,number> = { nhl:1, ahl:2, echl:3 }

export default async function HomePage() {
  const { data: leagues } = await supabase
    .from('leagues')
    .select('code,name')

  const ordered = (leagues ?? []).slice().sort((a:any,b:any) =>
    (leagueOrder[a.code]??99) - (leagueOrder[b.code]??99)
  )

  return (
    <main>
      {/* Your preferred logo size */}
      <div className="center-logo">
        <Image
          src="/capcomp-logo.png"
          alt="CAPcomp Logo"
          width={300}
          height={100}
          style={{ width:'100%', maxWidth:300, height:'auto' }}
          priority
        />
      </div>

      <section className="hero">
        <p>Salary cap intelligence, rosters, lines & stats</p>
      </section>

      <div className="grid">
        {ordered.map((l:any) => {
          const src = leagueLogos[l.code]
          return (
            <Link key={l.code} href={`/league/${l.code}`} className="card">
              {src ? <img src={src} alt={`${l.name} logo`} className="logo-fixed-h" /> : null}
              <span style={{ fontSize:18 }}>{l.name}</span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
