import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <nav className="nav">
      <Link href="/">Home</Link>{' | '}
      <Link href="/league/nhl">NHL</Link>{' | '}
      <Link href="/league/ahl">AHL</Link>{' | '}
      <Link href="/league/echl">ECHL</Link>
      <div className="nav-spacer" />
      <ThemeToggle />
    </nav>
  )
}
