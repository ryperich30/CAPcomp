import './globals.css'
import Header from './components/Header' // if you don't have Header yet, you can remove this line

export const metadata = {
  title: 'CAPcomp',
  description: 'Sports salary & stats',
  // Tell browsers/socials exactly which files to use
  icons: {
    icon: '/favicon.png',            // you uploaded this to /public
    // If you later add apple touch icons, add:
    // apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'CAPcomp',
    description: 'Sports salary & stats',
    images: ['/og.png'],             // you uploaded this to /public
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
      <body style={{ margin: 0 }}>
        {/* Remove <Header /> if you don't have it */}
        <Header />
        {children}
      </body>
    </html>
  )
}
