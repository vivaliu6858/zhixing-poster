import { THEMES } from '../themes'
import type { ThemeId } from '../types'

interface Props {
  value: ThemeId
  onChange: (id: ThemeId) => void
}

export default function ThemeSelector({ value, onChange }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
      {THEMES.map(theme => (
        <div
          key={theme.id}
          onClick={() => onChange(theme.id as ThemeId)}
          style={{
            cursor: 'pointer',
            borderRadius: 12,
            overflow: 'hidden',
            border: value === theme.id ? `3px solid ${theme.primary}` : '3px solid transparent',
            boxShadow: value === theme.id ? `0 0 0 1px ${theme.primary}` : 'none',
            transition: 'all 0.15s',
          }}
        >
          <div style={{
            height: 44,
            background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
          }} />
          <div style={{
            padding: '6px 8px', background: 'white',
            fontSize: 12, fontWeight: 600, color: '#333', textAlign: 'center',
          }}>{theme.name}</div>
        </div>
      ))}
    </div>
  )
}
