import Link from 'next/link'

export default function Header() {
  return (
    <nav className="nav">
      <Link href="/">Home</Link>{' | '}
      <Link href="/league/nhl">NHL</Link>{' | '}
      <Link href="/league/ahl">AHL</Link>{' | '}
      <Link href="/league/echl">ECHL</Link>
    </nav>
  )
}
