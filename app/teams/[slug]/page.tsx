import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: team } = await supabase
    .from('teams')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!team) {
    return <main style={{ padding:24 }}><h1>Team not found</h1></main>
  }

  return (
    <main style={{ padding:24 }}>
      <h1>{team.name}</h1>
      <p><b>League:</b> {team.league_code.toUpperCase()}</p>
      <p><b>Slug:</b> {team.slug}</p>
      {team.logo_url && (
        <img
          src={team.logo_url}
          alt={`${team.name} logo`}
          style={{ width:80, marginTop:12 }}
        />
      )}
    </main>
  )
}
