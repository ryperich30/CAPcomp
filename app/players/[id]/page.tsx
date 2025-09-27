export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main style={{ padding: 24 }}>
      <h1>Player Profile</h1>
      <p>Showing player with ID: {id}</p>
    </main>
  )
}
