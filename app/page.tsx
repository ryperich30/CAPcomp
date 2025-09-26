import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Page() {
  const { data: players } = await supabase.from('players').select('*')

  return (
    <main style={{ padding: 24 }}>
      <h1>CAPcomp</h1>
      <h2>Players (from Supabase)</h2>
      <ul>
        {players?.map(p => (
          <li key={p.id}>{p.name} — {p.team}</li>
        ))}
      </ul>
    </main>
  )
}
