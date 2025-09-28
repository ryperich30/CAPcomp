import { createClient } from '@supabase/supabase-js'
import Tabs from '@/app/components/Tabs' // uses Next 15 import alias if set; if not, change to relative: '../../components/Tabs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function TeamPage({ params }:{ params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: team } = await supabase
    .from('teams')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!team) return <main><h1>Team not found</h1></main>

  const tabs = [
    { key: 'roster',   label: 'Roster',   content: <p>Roster coming soon.</p> },
    { key: 'lines',    label: 'Lines',    content: <p>Lines coming soon.</p> },
    { key: 'contracts',label: 'Contracts',content: <p>Contracts coming soon.</p> },
    { key: 'stats',    label: 'Stats',    content: <p>Stats coming soon.</p> },
  ]

  return (
    <main>
      <h1>{team.name}</h1>
      <p><b>League:</b> {team.league_code.toUpperCase()}</p>
      {team.logo_url ? <img src={team.logo_url} alt={`${team.name} logo`} style={{ width:120 }} /> : null}

      <Tabs tabs={tabs} />
    </main>
  )
}
