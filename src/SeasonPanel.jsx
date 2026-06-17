import { useState } from 'react'

const SEASONS = [
  { id: 'spring', label: 'Spring', icon: '🌸' },
  { id: 'summer', label: 'Summer', icon: '☀️' },
  { id: 'fall',   label: 'Fall',   icon: '🍂' },
  { id: 'winter', label: 'Winter', icon: '❄️' },
]

const WEATHERS = [
  { id: 'sunny',  label: 'Sunny',  icon: '☀️' },
  { id: 'rainy',  label: 'Rain',   icon: '🌧️' },
  { id: 'stormy', label: 'Storm',  icon: '⛈️' },
  { id: 'snowy',  label: 'Snow',   icon: '🌨️' },
]

export default function SeasonPanel({ season, weather, onSeason, onWeather }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`season-panel ${open ? 'open' : ''}`}>
      <button className="panel-toggle" onClick={() => setOpen(o => !o)} title="Farm Settings">
        {open ? '✕' : '⚙'}
      </button>

      {open && (
        <div className="panel-body">
          <div className="panel-title">Farm Settings</div>

          <div className="panel-section-label">Season</div>
          <div className="panel-row">
            {SEASONS.map(s => (
              <button key={s.id}
                className={`panel-btn ${season === s.id ? 'active' : ''}`}
                onClick={() => onSeason(s.id)}
                title={s.label}
              >
                <span className="panel-btn-icon">{s.icon}</span>
                <span className="panel-btn-label">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="panel-section-label">Weather</div>
          <div className="panel-row">
            {WEATHERS.map(w => (
              <button key={w.id}
                className={`panel-btn ${weather === w.id ? 'active' : ''}`}
                onClick={() => onWeather(w.id)}
                title={w.label}
              >
                <span className="panel-btn-icon">{w.icon}</span>
                <span className="panel-btn-label">{w.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
