import { createClient } from '@supabase/supabase-js'
import Tabs from '../../components/Tabs'          // NOTE: relative path
import RosterTable from './RosterTable'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function TeamPage({ params }:{ params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: team, error } = await supabase
    .from('teams')
    .select('id,name,league_code,logo_url,slug')
    .eq('slug', slug)
    .maybeSingle()

  if (error) return <main><p>Error: {error.message}</p></main>
  if (!team) return <main><h1>Team not found</h1></main>

  const season = '2025-26'

  const tabs = [
    { key:'roster',    label:'Roster',    content: <RosterTable teamId={team.id} season={season} /> },
    { key:'lines',     label:'Lines',     content: <p>Lines coming soon.</p> },
    { key:'contracts', label:'Contracts', content: <p>Contracts coming soon.</p> },
    { key:'stats',     label:'Stats',     content: <p>Stats coming soon.</p> },
  ]

  return (
    <main>
      <h1>{team.name}</h1>
      {team.logo_url ? (
        <img src={team.logo_url} alt={`${team.name} logo`}
             style={{ height:56, width:'auto', objectFit:'contain', display:'block' }} />
      ) : null}

      <Tabs tabs={tabs} initial="roster" />
    </main>
  )
}
