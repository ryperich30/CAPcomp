import { createClient } from '@supabase/supabase-js'
import RosterTable from './RosterTable'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function TeamPage({ params }:{ params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: team } = await supabase
    .from('teams')
    .select('id,name,league_code,logo_url,slug')
    .eq('slug', slug)
    .maybeSingle()

  if (!team) return <main><h1>Team not found</h1></main>

  const season = '2024-25'

  return (
    <main>
      <h1>{team.name}</h1>
      {team.logo_url ? (
        <img src={team.logo_url} alt={`${team.name} logo`}
             style={{ height:56, width:'auto', objectFit:'contain', display:'block' }} />
      ) : null}

      <h2 style={{ marginTop:16 }}>Roster — {season}</h2>
      <RosterTable teamId={team.id} season={season} />
    </main>
  )
}
