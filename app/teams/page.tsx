export default function TeamsPage() {
  const teams = ['Colorado Avalanche', 'Toronto Maple Leafs']

  return (
    <main style={{ padding: 24 }}>
      <h1>Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team}>{team}</li>
        ))}
      </ul>
    </main>
  )
}
