import Link from 'next/link'
import Image from 'next/image'

export default function LeagueCard({
  code,
  name,
  logoUrl,
}: { code: string; name: string; logoUrl?: string }) {
  return (
    <Link
      href={`/league/${code}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        border: '1px solid #eee',
        borderRadius: 8,
        textDecoration: 'none',
      }}
    >
      {logoUrl ? (
        <Image src={logoUrl} alt={`${name} logo`} width={40} height={40} />
      ) : null}
      <span style={{ fontSize: 18 }}>{name}</span>
    </Link>
  )
}
