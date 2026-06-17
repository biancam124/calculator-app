import { useMemo } from 'react'

const CLOUD_SHAPES = [
  // x,y offsets for each "puff" circle within a cloud: [cx, cy, r]
  [[0,0,22],[28,-6,18],[52,0,20],[22,-12,14]],
  [[0,0,18],[24,-4,22],[50,2,16],[36,-14,16]],
  [[0,0,20],[30,0,24],[58,0,18],[18,-10,14],[46,-10,16]],
]

const WEATHER_CLOUD_COLORS = {
  sunny:  { fill: '#ffffff', shadow: '#ddeeff', count: 4, opacity: 1 },
  rainy:  { fill: '#8899aa', shadow: '#667788', count: 7, opacity: 0.95 },
  stormy: { fill: '#445566', shadow: '#334455', count: 8, opacity: 1 },
  snowy:  { fill: '#ccd8e8', shadow: '#b0c0d4', count: 6, opacity: 0.9 },
}

function Cloud({ id, x, y, scale, shape, fill, shadow, duration, delay }) {
  const w = 80 * scale
  const keyframes = `@keyframes cloud-${id} {
    from { transform: translateX(-${w + 40}px); }
    to   { transform: translateX(110vw); }
  }`
  return (
    <>
      <style>{keyframes}</style>
      <div style={{
        position: 'absolute',
        top: y,
        left: 0,
        animation: `cloud-${id} ${duration}s ${delay}s linear infinite`,
        willChange: 'transform',
        pointerEvents: 'none',
      }}>
        <svg width={w} height={50 * scale} viewBox="0 0 80 50" style={{ overflow: 'visible' }}>
          {/* shadow layer */}
          {shape.map(([cx, cy, r], i) => (
            <circle key={`s${i}`} cx={cx} cy={cy + 4} r={r} fill={shadow} />
          ))}
          {/* cloud body */}
          {shape.map(([cx, cy, r], i) => (
            <circle key={`c${i}`} cx={cx} cy={cy} r={r} fill={fill} />
          ))}
        </svg>
      </div>
    </>
  )
}

export default function Clouds({ weather }) {
  const cfg = WEATHER_CLOUD_COLORS[weather] ?? WEATHER_CLOUD_COLORS.sunny
  const clouds = useMemo(() => {
    const list = []
    for (let i = 0; i < cfg.count; i++) {
      list.push({
        id: i,
        x: 0,
        y: `${4 + (i % 4) * 7}%`,
        scale: 0.7 + (i % 3) * 0.25,
        shape: CLOUD_SHAPES[i % CLOUD_SHAPES.length],
        duration: 28 + i * 7,
        delay: -(i * (28 + i * 7) / cfg.count),
      })
    }
    return list
  }, [cfg.count])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', opacity: cfg.opacity }}>
      {clouds.map(c => (
        <Cloud key={c.id} {...c} fill={cfg.fill} shadow={cfg.shadow} />
      ))}
    </div>
  )
}
