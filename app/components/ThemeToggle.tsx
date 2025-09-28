'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const KEY = 'capcomp-theme'
  const [theme, setTheme] = useState<'light'|'dark'>('light')

  useEffect(() => {
    // read current theme from <html data-theme="...">
    const current = document.documentElement.getAttribute('data-theme') as 'light'|'dark'|null
    if (current) setTheme(current)
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem(KEY, next) } catch {}
  }

  return (
    <button className="theme-btn" onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
