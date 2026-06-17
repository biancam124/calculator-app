import { useState, useEffect, useRef } from 'react'
import { ChickenSprite, CatSprite, CoinSprite, CropSprite } from './Sprites'

// ── Chicken ───────────────────────────────────────────────────────────────
export function Chicken() {
  const [pos, setPos] = useState(60)
  const [dir, setDir] = useState(1)
  const [clucking, setClucking] = useState(false)
  const [fed, setFed] = useState(0)
  const posRef = useRef(60)
  const dirRef = useRef(1)

  useEffect(() => {
    const maxX = window.innerWidth * 0.42
    const id = setInterval(() => {
      posRef.current += dirRef.current * 1.4
      if (posRef.current > maxX || posRef.current < 20) dirRef.current *= -1
      setPos(posRef.current)
      setDir(dirRef.current)
    }, 80)
    return () => clearInterval(id)
  }, [])

  function handleClick() {
    setClucking(true)
    setFed(f => f + 1)
    setTimeout(() => setClucking(false), 800)
  }

  return (
    <div className="sprite-wrap chicken-wrap" style={{ left: `${pos}px` }}
      onClick={handleClick} title="Click to feed!">
      <div className={`sprite ${clucking ? 'cluck' : ''}`}>
        <ChickenSprite flipped={dir < 0} />
      </div>
      {clucking && <div className="bubble">Bwok! {fed > 3 ? '🌽' : '♥'}</div>}
      {fed > 0 && <div className="fed-count">×{fed}</div>}
    </div>
  )
}

// ── Crop ─────────────────────────────────────────────────────────────────
const CROP_LABELS = ['Water me!', 'Growing…', 'Almost…', 'Harvest!']

export function Crop() {
  const [stage, setStage] = useState(0)
  const [watered, setWatered] = useState(false)
  const [popped, setPopped] = useState(false)

  function handleClick() {
    if (stage >= 3) {
      setPopped(true)
      setTimeout(() => { setPopped(false); setStage(0); setWatered(false) }, 900)
      return
    }
    setWatered(true)
    setTimeout(() => { setStage(s => s + 1); setWatered(false) }, 500)
  }

  return (
    <div className="sprite-wrap" onClick={handleClick} title={CROP_LABELS[stage]}>
      {watered && <div className="water-drops">💧</div>}
      <div className={`sprite ${popped ? 'pop' : ''}`}>
        <CropSprite stage={stage} />
      </div>
      <div className="sprite-label">{CROP_LABELS[stage]}</div>
    </div>
  )
}

// ── Cat ───────────────────────────────────────────────────────────────────
const CAT_MOODS = [
  { mood: 'content',   msg: 'Purrrr…' },
  { mood: 'happy',     msg: 'Mrow!' },
  { mood: 'playful',   msg: 'Hehe!' },
  { mood: 'surprised', msg: 'MREOW?!' },
  { mood: 'loving',    msg: '♥ ♥ ♥' },
]

export function Cat() {
  const [idx, setIdx] = useState(0)
  const [showMsg, setShowMsg] = useState(false)
  const [pets, setPets] = useState(0)

  function handleClick() {
    setIdx(i => (i + 1) % CAT_MOODS.length)
    setShowMsg(true)
    setPets(p => p + 1)
    setTimeout(() => setShowMsg(false), 1000)
  }

  return (
    <div className="sprite-wrap" onClick={handleClick} title="Pet the cat!">
      {showMsg && <div className="bubble">{CAT_MOODS[idx].msg}</div>}
      <div className="sprite"><CatSprite mood={CAT_MOODS[idx].mood} /></div>
      <div className="sprite-label">Pet {pets > 0 ? `×${pets}` : ''}</div>
    </div>
  )
}

// ── Gold Coin ─────────────────────────────────────────────────────────────
export function GoldBag() {
  const [gold, setGold] = useState(0)
  const [sparkle, setSparkle] = useState(false)

  function handleClick() {
    setGold(g => g + Math.floor(Math.random() * 50) + 10)
    setSparkle(true)
    setTimeout(() => setSparkle(false), 600)
  }

  return (
    <div className="sprite-wrap" onClick={handleClick} title="Collect gold!">
      {sparkle && <div className="sparkle">✨</div>}
      <div className={`sprite ${sparkle ? 'spin' : ''}`}><CoinSprite /></div>
      <div className="sprite-label gold-count">{gold}g</div>
    </div>
  )
}

// ── Layout ────────────────────────────────────────────────────────────────
export default function FarmSprites() {
  return (
    <>
      <div className="chicken-runway"><Chicken /></div>
      <div className="farm-bottom-left"><Crop /></div>
      <div className="farm-bottom-right">
        <Cat />
        <GoldBag />
      </div>
    </>
  )
}
