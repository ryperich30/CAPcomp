import Header from './components/Header'

export const metadata = { title: 'CAPcomp', description: 'Sports salary & stats' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Header />
        {children}
      </body>
    </html>
  )
}
