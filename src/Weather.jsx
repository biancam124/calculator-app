import { useEffect, useRef, useState } from 'react'

function Rain({ heavy }) {
  const drops = Array.from({ length: heavy ? 80 : 40 }, (_, i) => i)
  return (
    <div className="weather-overlay rain-overlay">
      {drops.map(i => (
        <div key={i} className="rain-drop" style={{
          left: `${(i * 1.31 * 100 / drops.length) % 100}%`,
          animationDelay: `${(i * 0.13) % 1.2}s`,
          animationDuration: `${heavy ? 0.5 + (i % 3) * 0.1 : 0.8 + (i % 4) * 0.15}s`,
          height: heavy ? `${14 + (i % 8)}px` : `${10 + (i % 6)}px`,
          opacity: heavy ? 0.75 : 0.55,
        }} />
      ))}
    </div>
  )
}

function Snow() {
  const flakes = Array.from({ length: 50 }, (_, i) => i)
  return (
    <div className="weather-overlay snow-overlay">
      {flakes.map(i => (
        <div key={i} className="snow-flake" style={{
          left: `${(i * 2.1) % 100}%`,
          animationDelay: `${(i * 0.19) % 4}s`,
          animationDuration: `${3 + (i % 5) * 0.8}s`,
          fontSize: `${8 + (i % 4) * 4}px`,
          opacity: 0.7 + (i % 3) * 0.1,
        }}>❄</div>
      ))}
    </div>
  )
}

function Lightning() {
  const [flash, setFlash] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    function schedule() {
      timerRef.current = setTimeout(() => {
        setFlash(true)
        setTimeout(() => {
          setFlash(false)
          setTimeout(() => { setFlash(true); setTimeout(() => { setFlash(false); schedule() }, 80) }, 120)
        }, 80)
      }, 2000 + Math.random() * 5000)
    }
    schedule()
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <>
      {flash && <div className="lightning-flash" />}
      <Rain heavy />
    </>
  )
}

export default function WeatherFX({ weather }) {
  if (weather === 'rainy') return <Rain />
  if (weather === 'stormy') return <Lightning />
  if (weather === 'snowy') return <Snow />
  return null
}
