import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

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
    <main>
      <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
        <Image src="/capcomp-logo.png" alt="CAPcomp Logo" width={300} height={100}
               style={{ width:'100%', maxWidth:300, height:'auto' }} priority />
      </div>

      <h2>Leagues</h2>
      <div style={{ display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))' }}>
        {leagues?.map((l:any) => (
          <Link key={l.code} href={`/league/${l.code}`}
            style={{ display:'flex', alignItems:'center', gap:12, padding:12, border:'1px solid #eee', borderRadius:8 }}>
            {l.logo_url ? <img src={l.logo_url} alt={`${l.name} logo`} width={40} /> : null}
            <span style={{ fontSize:18 }}>{l.name}</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
