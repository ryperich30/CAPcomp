'use client'
import { useState, ReactNode } from 'react'

type Tab = { key: string; label: string; content: ReactNode }

export default function Tabs({ tabs, initial='roster' }:{ tabs: Tab[]; initial?: string }) {
  const [active, setActive] = useState(initial)
  return (
    <div>
      <div style={{ display:'flex', gap:8, borderBottom:'1px solid var(--border)', margin:'16px 0' }}>
        {tabs.map(t => (
          <button key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              padding:'8px 12px',
              border:'1px solid var(--border)',
              borderBottom: active===t.key ? '2px solid var(--accent)' : '1px solid var(--border)',
              borderRadius:'8px 8px 0 0',
              background: active===t.key ? 'var(--card)' : 'transparent',
              color:'var(--fg)', cursor:'pointer'
            }}>
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs.find(t => t.key === active)?.content}</div>
    </div>
  )
}
