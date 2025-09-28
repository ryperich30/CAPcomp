import Link from 'next/link'

export default function Header() {
  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #eee' }}>
      <Link href="/">Home</Link>{' | '}
      <Link href="/league/nhl">NHL</Link>{' | '}
      <Link href="/league/ahl">AHL</Link>{' | '}
      <Link href="/league/echl">ECHL</Link>
    </nav>
  )
}
