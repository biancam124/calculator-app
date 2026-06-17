const PENTA = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.5, 1174.66, 1318.51]

let ctx = null
let muted = false

export function setMuted(val) { muted = val }
export function getMuted() { return muted }

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// ── Starry Night: inharmonic bell, long ethereal sustain ─────────────────
function bell(freq, vol, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1)
  g.connect(c.destination)
  [[1, 1], [2.756, 0.35], [5.404, 0.08]].forEach(([r, a]) => {
    const osc = c.createOscillator(), gg = c.createGain()
    gg.gain.value = a; osc.type = 'sine'; osc.frequency.value = freq * r
    osc.connect(gg); gg.connect(g); osc.start(t); osc.stop(t + 1.2)
  })
}

// ── Cosmic: retro 8-bit square wave blip ─────────────────────────────────
function squareBeep(freq, vol, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.setValueAtTime(vol * 0.5, t + 0.04)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'square'
  osc.frequency.setValueAtTime(freq * 1.6, t)
  osc.frequency.setValueAtTime(freq, t + 0.04)
  osc.connect(g); osc.start(t); osc.stop(t + 0.22)
}

// ── Ocean: three quick descending water ripples ───────────────────────────
// Each ripple is a pitch that falls from ~800 to ~80 Hz.
// Three in rapid succession sounds unmistakably like splashing water.
function oceanRipple(_freq, vol, delay = 0) {
  const c = getCtx()
  ;[0, 0.11, 0.20].forEach((offset, i) => {
    const t = c.currentTime + delay + offset
    const startHz = 820 - i * 160   // 820, 660, 500
    const endHz   = 80  - i * 15    //  80,  65,  50
    const g = c.createGain()
    g.gain.setValueAtTime(vol * (1 - i * 0.18), t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
    g.connect(c.destination)
    const osc = c.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(startHz, t)
    osc.frequency.exponentialRampToValueAtTime(endHz, t + 0.14)
    osc.connect(g); osc.start(t); osc.stop(t + 0.22)
  })
}

// ── Crimson Dusk: deep temple gong at 65 Hz — heavy, ominous ─────────────
// Absolute low frequency regardless of button. Feels like a tolling bell
// in a desert at dusk. Very different pitch register from everything else.
function templeGong(_freq, vol, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  // Low fundamental — feels physical/heavy
  const g = c.createGain()
  g.gain.setValueAtTime(vol * 1.3, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'triangle'
  osc.frequency.value = 65   // deep, almost sub-bass
  osc.connect(g); osc.start(t); osc.stop(t + 1.5)
  // Inharmonic shimmer — gongs have this
  const osc2 = c.createOscillator(), g2 = c.createGain()
  g2.gain.setValueAtTime(vol * 0.5, t)
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
  osc2.type = 'sine'; osc2.frequency.value = 65 * 2.76
  osc2.connect(g2); g2.connect(c.destination)
  osc2.start(t); osc2.stop(t + 0.55)
  // High shimmer — adds the "gong ring"
  const osc3 = c.createOscillator(), g3 = c.createGain()
  g3.gain.setValueAtTime(vol * 0.25, t)
  g3.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
  osc3.type = 'sine'; osc3.frequency.value = 65 * 5.4
  osc3.connect(g3); g3.connect(c.destination)
  osc3.start(t); osc3.stop(t + 0.25)
}

// ── Forest: bird chirp — sine sweeping sharply UP ────────────────────────
// 300 → 2200 Hz in 120 ms with soft attack then fast cut.
// Opposite direction to ocean; instantly recognised as "bird."
function birdChirp(_freq, vol, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(vol * 1.1, t + 0.018)
  g.gain.setValueAtTime(vol * 1.1, t + 0.09)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(300, t)
  osc.frequency.exponentialRampToValueAtTime(2200, t + 0.13)  // sweep UP
  osc.connect(g); osc.start(t); osc.stop(t + 0.18)
  // Second chirp — birds often do a quick double tweet
  const t2 = t + 0.14
  const g2 = c.createGain()
  g2.gain.setValueAtTime(0, t2)
  g2.gain.linearRampToValueAtTime(vol * 0.65, t2 + 0.015)
  g2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.12)
  g2.connect(c.destination)
  const osc2 = c.createOscillator()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(500, t2)
  osc2.frequency.exponentialRampToValueAtTime(1800, t2 + 0.10)
  osc2.connect(g2); osc2.start(t2); osc2.stop(t2 + 0.14)
}

// ── Moonlight: minor harp arpeggio — gothic and mysterious ───────────────
// Three triangle-wave notes in a minor chord, each plucked 80 ms apart.
// Triangle sounds warmer than sine; the minor 3rd interval feels gothic.
function moonHarp(freq, vol, delay = 0) {
  const c = getCtx()
  const base = freq * 1.5   // mid-high register, harp-like
  // Minor triad intervals: root, minor 3rd (×1.189), perfect 5th (×1.498)
  ;[base, base * 1.189, base * 1.498].forEach((f, i) => {
    const t = c.currentTime + delay + i * 0.085
    const g = c.createGain()
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.75)
    g.connect(c.destination)
    const osc = c.createOscillator()
    osc.type = 'triangle'; osc.frequency.value = f
    osc.connect(g); osc.start(t); osc.stop(t + 0.8)
  })
}

// ── Hover tick ───────────────────────────────────────────────────────────
function hoverTick(theme) {
  const c = getCtx(), t = c.currentTime
  const g = c.createGain()
  g.gain.setValueAtTime(0.02, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = theme === 'purple' ? 'square' : 'sine'
  osc.frequency.value = theme === 'crimson' ? 130
    : theme === 'teal'    ? 1100
    : theme === 'emerald' ? 1800
    : theme === 'silver'  ? 1400
    : 900
  osc.connect(g); osc.start(t); osc.stop(t + 0.1)
}

function synthFor(theme) {
  switch (theme) {
    case 'purple':  return squareBeep
    case 'teal':    return oceanRipple
    case 'crimson': return templeGong
    case 'emerald': return birdChirp
    case 'silver':  return moonHarp
    default:        return bell
  }
}

export function playSound(type, idx = 0, theme = 'night') {
  if (muted) return
  try {
    if (type === 'hover') { hoverTick(theme); return }
    const play = synthFor(theme)
    switch (type) {
      case 'number': play(PENTA[idx % PENTA.length], 0.10); break
      case 'op':     play(PENTA[(idx + 4) % PENTA.length] * 1.25, 0.12); break
      case 'eq':     [0, 2, 5].forEach((n, j) => play(PENTA[n], 0.11, j * 0.13)); break
      case 'clr':    play(PENTA[0] * 0.5, 0.10); break
    }
  } catch (_) {}
}
