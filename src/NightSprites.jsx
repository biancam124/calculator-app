import { useState, useEffect, useRef } from 'react'

// ── Twinkling stars scattered in sky ─────────────────────────────────────
const STAR_POSITIONS = [
  [8,8],[18,14],[30,6],[44,10],[56,5],[70,12],[82,7],[92,16],
  [14,28],[35,22],[50,30],[64,20],[78,26],[88,32],
  [6,42],[22,38],[45,44],[60,36],[75,40],[94,38],
]

function TwinklingStars() {
  const [wishes, setWishes] = useState(0)
  const [shooting, setShooting] = useState(null)

  function handleStar(i) {
    setShooting(i)
    setWishes(w => w + 1)
    setTimeout(() => setShooting(null), 1200)
  }

  return (
    <div className="stars-layer">
      {STAR_POSITIONS.map(([x, y], i) => (
        <button key={i} className={`star-btn ${shooting === i ? 'shooting' : ''}`}
          style={{ left: `${x}%`, top: `${y}%` }}
          onClick={() => handleStar(i)} title="Make a wish!">
          <div className="star-glow" style={{ animationDelay: `${i * 0.37}s`, animationDuration: `${2 + (i % 3) * 0.8}s` }} />
        </button>
      ))}
      {wishes > 0 && (
        <div className="wish-count">✦ {wishes} {wishes === 1 ? 'wish' : 'wishes'} made</div>
      )}
    </div>
  )
}

// ── Moon ─────────────────────────────────────────────────────────────────
const MOON_PHASES = [
  { label: 'New',       clip: 'circle(0% at 60% 50%)',      glow: '#f0e06020' },
  { label: 'Crescent',  clip: 'ellipse(20% 50% at 70% 50%)', glow: '#f0e06060' },
  { label: 'Half',      clip: 'ellipse(50% 50% at 75% 50%)', glow: '#f0e060a0' },
  { label: 'Gibbous',   clip: 'ellipse(80% 50% at 65% 50%)', glow: '#f0e060c0' },
  { label: 'Full',      clip: 'none',                        glow: '#f0e060ff' },
]

function Moon() {
  const [phase, setPhase] = useState(4) // start full
  const [showLabel, setShowLabel] = useState(false)

  function handleClick() {
    setPhase(p => (p + 1) % MOON_PHASES.length)
    setShowLabel(true)
    setTimeout(() => setShowLabel(false), 1200)
  }

  const { label, clip, glow } = MOON_PHASES[phase]

  return (
    <div className="moon-wrap" onClick={handleClick} title="Click to change moon phase">
      <div className="moon-outer" style={{ boxShadow: `0 0 40px 15px ${glow}, 0 0 80px 30px ${glow}55` }}>
        <div className="moon-body">
          <div className="moon-face" style={{ clipPath: clip }} />
        </div>
      </div>
      {showLabel && <div className="moon-label">{label} Moon</div>}
    </div>
  )
}

// ── Owl ──────────────────────────────────────────────────────────────────
const OWL_STATES = [
  { emoji: '🦉', msg: 'Hoo hoo…' },
  { emoji: '🦉', msg: 'Who goes there?' },
  { emoji: '🦉', msg: 'Hooooot!' },
  { emoji: '🦉', msg: 'I see you…' },
  { emoji: '🦉', msg: '*blinks slowly*' },
]

function Owl() {
  const [idx, setIdx] = useState(0)
  const [showMsg, setShowMsg] = useState(false)
  const [hoots, setHoots] = useState(0)

  function handleClick() {
    setIdx(i => (i + 1) % OWL_STATES.length)
    setShowMsg(true)
    setHoots(h => h + 1)
    setTimeout(() => setShowMsg(false), 1200)
  }

  return (
    <div className="night-sprite owl-sprite" onClick={handleClick} title="Disturb the owl">
      {showMsg && <div className="night-bubble">{OWL_STATES[idx].msg}</div>}
      <div className="night-sprite-icon owl-icon">🦉</div>
      {hoots > 0 && <div className="night-sprite-count">×{hoots}</div>}
    </div>
  )
}

// ── Candle / village light ────────────────────────────────────────────────
function Candle() {
  const [lit, setLit] = useState(true)
  const [flickers, setFlickers] = useState(0)

  function handleClick() {
    setLit(l => !l)
    setFlickers(f => f + 1)
  }

  return (
    <div className="night-sprite candle-sprite" onClick={handleClick} title={lit ? 'Snuff the candle' : 'Light the candle'}>
      <div className={`night-sprite-icon candle-icon ${lit ? 'candle-lit' : 'candle-out'}`}>
        {lit ? '🕯️' : '🕯'}
      </div>
      <div className="night-sprite-count">{lit ? 'Lit' : 'Dark'}</div>
    </div>
  )
}

// ── Layout ────────────────────────────────────────────────────────────────
export default function NightSprites() {
  return (
    <>
      <TwinklingStars />
      <Moon />
      <div className="night-bottom-left"><Owl /></div>
      <div className="night-bottom-right"><Candle /></div>
    </>
  )
}
