import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Page() {
  const { data: players, error } = await supabase
    .from('players')
    .select('id,name,team')
    .order('name', { ascending: true })

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial' }}>
      <h1>CAPcomp</h1>
      <h2>Players (from Supabase)</h2>

      {error && (
        <p style={{ color: 'crimson' }}>
          Error: {error.message}
        </p>
      )}

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
