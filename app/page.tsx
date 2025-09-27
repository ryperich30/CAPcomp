import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Page() {
  const { data: players } = await supabase.from('players').select('*')

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      {/* Logo at top */}
      <Image 
        src="/capcomp-logo.png" 
        alt="CAPcomp Logo" 
        width={200} 
        height={200} 
        priority
      />

      <h1>CAPcomp</h1>
      <h2>Players (from Supabase)</h2>

      {!players?.length ? (
        <p>No players found yet.</p>
      ) : (
        <ul>
          {players.map((p: any) => (
            <li key={p.id}>{p.name} — {p.team}</li>
          ))}
        </ul>
      )}
    </main>
  )
}
