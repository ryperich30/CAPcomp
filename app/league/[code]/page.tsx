import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function LeaguePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params

  const { data: league } = await supabase
    .from('leagues')
    .select('name')
    .eq('code', code)
    .maybeSingle()

  const { data: teams } = await supabase
    .from('teams')
    .select('id,name,slug')
    .eq('league_code', code)
    .order('name')

  return (
    <main style={{ padding:24 }}>
      <h1>{league?.name ?? code.toUpperCase()}</h1>
      <ul>
        {teams?.map((t:any) => (
          <li key={t.id}>
            <Link href={`/teams/${t.slug}`}>{t.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
