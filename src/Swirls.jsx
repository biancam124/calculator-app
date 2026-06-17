import { useMemo } from 'react'

const SWIRL_COLORS = ['#4a7ec8', '#6aaed8', '#3a68b0', '#5090c8', '#7ab8e0']

export default function Swirls() {
  const swirls = useMemo(() => [
    { cx: '18%', cy: '18%', rx: 110, ry: 70,  rot: -20, color: SWIRL_COLORS[0], dur: 14, del: 0   },
    { cx: '42%', cy: '12%', rx: 160, ry: 90,  rot:  10, color: SWIRL_COLORS[1], dur: 18, del: 2   },
    { cx: '68%', cy: '22%', rx: 130, ry: 80,  rot: -30, color: SWIRL_COLORS[2], dur: 16, del: 4   },
    { cx: '28%', cy: '38%', rx: 100, ry: 60,  rot:  15, color: SWIRL_COLORS[3], dur: 20, del: 1   },
    { cx: '78%', cy: '35%', rx: 120, ry: 70,  rot: -10, color: SWIRL_COLORS[4], dur: 15, del: 3   },
    { cx: '55%', cy: '45%', rx:  90, ry: 55,  rot:  25, color: SWIRL_COLORS[0], dur: 22, del: 5   },
    { cx: '12%', cy: '50%', rx: 140, ry: 80,  rot: -15, color: SWIRL_COLORS[1], dur: 17, del: 2.5 },
  ], [])

  return (
    <svg className="swirls-layer" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        {swirls.map((s, i) => (
          <style key={i}>{`
            @keyframes swirl-${i} {
              0%,100% { opacity: 0.12; transform: scale(1) rotate(${s.rot}deg); }
              50%      { opacity: 0.22; transform: scale(1.08) rotate(${s.rot + 8}deg); }
            }
          `}</style>
        ))}
      </defs>

      {swirls.map((s, i) => (
        <g key={i} style={{
          transformOrigin: `${s.cx} ${s.cy}`,
          animation: `swirl-${i} ${s.dur}s ${s.del}s ease-in-out infinite`,
        }}>
          {[1.0, 0.7, 0.45].map((scale, j) => (
            <ellipse key={j}
              cx={s.cx} cy={s.cy}
              rx={s.rx * scale} ry={s.ry * scale}
              fill="none"
              stroke={s.color}
              strokeWidth={j === 0 ? 14 : j === 1 ? 10 : 7}
              opacity={j === 0 ? 0.5 : j === 1 ? 0.35 : 0.25}
              transform={`rotate(${s.rot}, ${s.cx.replace('%','') * 8}, ${s.cy.replace('%','') * 6})`}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
