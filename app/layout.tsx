import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: 'CAPcomp',
  description: 'Sports salary & stats',
  icons: { icon: '/favicon.png' },
  openGraph: { title: 'CAPcomp', description: 'Sports salary & stats', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title: 'CAPcomp', description: 'Sports salary & stats', images: ['/og.png'] },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set initial theme BEFORE paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try{
    var key='capcomp-theme';
    var stored=localStorage.getItem(key);
    var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }catch(e){}
})();
            `.trim()
          }}
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
