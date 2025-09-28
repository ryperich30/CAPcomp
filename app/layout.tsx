import './globals.css'
import Header from './components/Header'

export const metadata = { title: 'CAPcomp', description: 'Sports salary & stats' }

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
