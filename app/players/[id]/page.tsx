export default function PlayerPage({ params }: { params: { id: string } }) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Player Profile</h1>
      <p>Showing player with ID: {params.id}</p>
    </main>
  )
}
