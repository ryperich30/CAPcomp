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
  return (
    <main style={{ padding: 24 }}>
      <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
        <Image src="/capcomp-logo.png" alt="CAPcomp Logo" width={300} height={100}
               style={{ width:'100%', maxWidth:600, height:'auto' }} priority />
      </div>

      <h2>Leagues</h2>
      <ul>
        {leagues?.map((l:any) => (
          <li key={l.code}>
            <Link href={`/league/${l.code}`}>{l.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
