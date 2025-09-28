import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import LeagueCard from './components/LeagueCard'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function HomePage() {
  const { data: leagues } = await supabase
    .from('leagues')
    .select('code,name,logo_url')
    .order('name')

  return (
    <main style={{ padding: 24 }}>
      {/* CAPcomp logo centered */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
        <Image
          src="/capcomp-logo.png"
          alt="CAPcomp Logo"
          width={300}
          height={100}
          style={{ width:'100%', maxWidth:600, height:'auto' }}
          priority
        />
      </div>

      <h2>Leagues</h2>
      <div style={{
        display:'grid',
        gap:12,
        gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))'
      }}>
        {leagues?.map((l:any) => (
          <LeagueCard
            key={l.code}
            code={l.code}
            name={l.name}
            logoUrl={l.logo_url || undefined}
          />
        ))}
      </div>
    </main>
  )
}
