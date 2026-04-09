import { THEMES } from '../themes'
import type { ThemeId } from '../types'

interface Props {
  value: ThemeId
  onChange: (id: ThemeId) => void
}

export default function ThemeSelector({ value, onChange }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      {THEMES.map(theme => {
        const p = theme.palette
        const selected = value === theme.id
        return (
          <div
            key={theme.id}
            onClick={() => onChange(theme.id)}
            style={{
              cursor: 'pointer',
              borderRadius: 12,
              overflow: 'hidden',
              border: selected ? `3px solid ${p.primary}` : '3px solid transparent',
              boxShadow: selected ? `0 0 0 1px ${p.primary}` : 'none',
              transition: 'all 0.15s',
            }}
          >
            <div style={{
              height: 44,
              background: p.headerBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                color: p.onHeader, fontSize: 11, fontWeight: 700,
                fontFamily: theme.fonts.heading,
              }}>{theme.description}</span>
            </div>
            <div style={{
              padding: '6px 8px', background: p.bg,
              fontSize: 12, fontWeight: 600, color: p.text, textAlign: 'center',
            }}>{theme.name}</div>
          </div>
        )
      })}
    </div>
  )
}
