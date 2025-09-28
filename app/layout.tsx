import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: 'CAPcomp',
  description: 'Sports salary & stats',
  icons: {
    icon: '/favicon.png', // <- in /public
  },
  openGraph: {
    title: 'CAPcomp',
    description: 'Sports salary & stats',
    images: ['/og.png'],  // <- in /public
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CAPcomp',
    description: 'Sports salary & stats',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
