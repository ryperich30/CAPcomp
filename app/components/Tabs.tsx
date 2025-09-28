'use client'

import { useState, ReactNode } from 'react'

type Tab = { key: string; label: string; content: ReactNode }

export default function Tabs({ tabs, initial='roster' }:{ tabs: Tab[]; initial?: string }) {
  const [active, setActive] = useState(initial)
  return (
    <div>
      <div style={{ display:'flex', gap:8, borderBottom:'1px solid #eee', margin:'16px 0' }}>
        {tabs.map(t => (
          <button key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              padding:'8px 12px',
              border:'1px solid #ddd',
              borderBottom: active===t.key ? '2px solid #0b5fff' : '1px solid #ddd',
              borderRadius:'8px 8px 0 0',
              background: active===t.key ? '#f7faff' : '#fafafa',
              cursor:'pointer'
            }}>
            {t.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find(t => t.key === active)?.content}
      </div>
    </div>
  )
}
