import { useState } from 'react'

// ── Twinkling stars ───────────────────────────────────────────────────────
const STAR_POSITIONS = [
  [8,8],[18,14],[30,6],[44,10],[56,5],[70,12],[82,7],[92,16],
  [14,28],[35,22],[50,30],[64,20],[78,26],[88,32],
  [6,42],[22,38],[45,44],[60,36],[75,40],[94,38],
]

function TwinklingStars() {
  const [wishes, setWishes]     = useState(0)
  const [shooting, setShooting] = useState(null)

  function handleStar(i) {
    setShooting(i)
    setWishes(w => w + 1)
    setTimeout(() => setShooting(null), 1200)
  }

  return (
    <div className="stars-layer">
      {STAR_POSITIONS.map(([x, y], i) => (
        <button key={i}
          className={`star-btn ${shooting === i ? 'shooting' : ''}`}
          style={{ left: `${x}%`, top: `${y}%` }}
          onClick={() => handleStar(i)}
          title="Make a wish!">
          <div className="star-glow"
            style={{ animationDelay: `${i * 0.37}s`, animationDuration: `${2 + (i % 3) * 0.8}s` }} />
        </button>
      ))}
      {wishes > 0 && (
        <div className="wish-count">✦ {wishes} {wishes === 1 ? 'wish' : 'wishes'} made</div>
      )}
    </div>
  )
}

// ── Moon themes ───────────────────────────────────────────────────────────
const MOON_THEMES = {
  night:   { color: '#f5e880', shadow: '#0d1b52', outerGlow: '#f5e060', label: 'Starry Night Moon' },
  purple:  { color: '#d4b0ff', shadow: '#1e0e58', outerGlow: '#b080ff', label: 'Cosmic Moon'       },
  teal:    { color: '#80f0e8', shadow: '#0a2840', outerGlow: '#00d4c8', label: 'Ocean Moon'         },
  crimson: { color: '#ff9050', shadow: '#280810', outerGlow: '#e06020', label: 'Blood Moon'         },
  emerald: { color: '#a0f0b0', shadow: '#082810', outerGlow: '#40d870', label: 'Forest Moon'        },
  silver:  { color: '#f0f0ff', shadow: '#0e0e1c', outerGlow: '#d0d0f0', label: 'Moonlight'          },
}

const MOON_PHASES = [
  { label: 'New',      clip: 'circle(0% at 60% 50%)'       },
  { label: 'Crescent', clip: 'ellipse(20% 50% at 70% 50%)' },
  { label: 'Half',     clip: 'ellipse(50% 50% at 75% 50%)' },
  { label: 'Gibbous',  clip: 'ellipse(80% 50% at 65% 50%)' },
  { label: 'Full',     clip: 'none'                         },
]

function Moon({ theme = 'night' }) {
  const [phase, setPhase]     = useState(4)
  const [showLabel, setLabel] = useState(false)

  function handleClick() {
    setPhase(p => (p + 1) % MOON_PHASES.length)
    setLabel(true)
    setTimeout(() => setLabel(false), 1400)
  }

  const mt = MOON_THEMES[theme] || MOON_THEMES.night
  const { label, clip } = MOON_PHASES[phase]
  const glow = phase === 4
    ? `0 0 40px 15px ${mt.outerGlow}cc, 0 0 80px 30px ${mt.outerGlow}55`
    : `0 0 20px 6px ${mt.outerGlow}66, 0 0 40px 14px ${mt.outerGlow}22`

  return (
    <div className="moon-wrap" onClick={handleClick} title="Click to change moon phase">
      <div className="moon-outer" style={{ boxShadow: glow }}>
        <div className="moon-body" style={{ background: mt.color }}>
          <div className="moon-face" style={{ clipPath: clip, background: mt.shadow }} />
        </div>
      </div>
      {showLabel && (
        <div className="moon-label">{label} Moon</div>
      )}
    </div>
  )
}

export default function NightSprites({ theme }) {
  return (
    <>
      <TwinklingStars />
      <Moon theme={theme} />
    </>
  )
}
