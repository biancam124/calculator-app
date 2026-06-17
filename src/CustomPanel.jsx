import { useState } from 'react'
import { getMuted, setMuted } from './useSound'

export const FONTS = [
  { id: 'pixel',   label: 'Pixel',   family: "'Press Start 2P', monospace" },
  { id: 'retro',   label: 'Retro',   family: "'VT323', monospace" },
  { id: 'elegant', label: 'Elegant', family: "'Cinzel', serif" },
  { id: 'space',   label: 'Space',   family: "'Orbitron', sans-serif" },
]

export const THEMES = [
  { id: 'night',   label: 'Starry Night', accent: '#f5d020', bg: '#0d1b52' },
  { id: 'purple',  label: 'Cosmic',       accent: '#c8a0ff', bg: '#1e0e58' },
  { id: 'teal',    label: 'Ocean',        accent: '#00d4e8', bg: '#0a2840' },
  { id: 'crimson', label: 'Crimson Dusk', accent: '#f0a030', bg: '#280810' },
  { id: 'emerald', label: 'Forest',       accent: '#40d880', bg: '#082810' },
  { id: 'silver',  label: 'Moonlight',    accent: '#e0e0f0', bg: '#0e0e1c' },
]

export default function CustomPanel({ name, font, theme, onName, onFont, onTheme }) {
  const [open, setOpen]       = useState(false)
  const [nameVal, setNameVal] = useState(name)
  const [muted, setMutedState] = useState(getMuted())

  function commitName() { if (nameVal.trim()) onName(nameVal.trim()) }
  function toggleMute() { const next = !muted; setMuted(next); setMutedState(next) }

  return (
    <div className={`custom-panel ${open ? 'open' : ''}`}>
      <button className="panel-toggle" onClick={() => setOpen(o => !o)} title="Customise">
        {open ? '✕' : '✦'}
      </button>

      {open && (
        <div className="panel-body">
          <div className="panel-title">Customise</div>

          {/* Name */}
          <div className="panel-section">
            <div className="panel-label">Name</div>
            <input className="panel-input"
              value={nameVal}
              onChange={e => setNameVal(e.target.value)}
              onBlur={commitName}
              onKeyDown={e => e.key === 'Enter' && commitName()}
              maxLength={22}
              placeholder="Calculator name…"
            />
          </div>

          {/* Font */}
          <div className="panel-section">
            <div className="panel-label">Font</div>
            <div className="panel-row">
              {FONTS.map(f => (
                <button key={f.id}
                  className={`panel-btn font-btn ${font === f.id ? 'active' : ''}`}
                  style={{ fontFamily: f.family, fontSize: f.id === 'retro' ? '16px' : f.id === 'elegant' ? '8px' : '7px' }}
                  onClick={() => onFont(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="panel-section">
            <div className="panel-label">Theme</div>
            <div className="panel-row theme-row">
              {THEMES.map(t => (
                <button key={t.id}
                  className={`theme-swatch ${theme === t.id ? 'active' : ''}`}
                  style={{ background: t.bg }}
                  onClick={() => onTheme(t.id)}
                  title={t.label}>
                  <span className="swatch-dot" style={{ background: t.accent }} />
                  <span className="swatch-label">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sound */}
          <div className="panel-section">
            <div className="panel-label">Sound</div>
            <button className={`panel-btn sound-btn ${muted ? '' : 'active'}`} onClick={toggleMute}>
              {muted ? '🔇 Muted' : '🔔 On'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
