const PENTA = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.5, 1174.66, 1318.51]

let ctx = null
let muted = false
let currentTheme = 'night'

export function setMuted(val) { muted = val }
export function getMuted() { return muted }
export function setCurrentTheme(t) { currentTheme = t }

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// ── Starry Night: inharmonic bell ───────────────────────────────────────
function bell(freq, vol = 0.09, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const master = c.createGain()
  master.gain.setValueAtTime(vol, t)
  master.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
  master.connect(c.destination)
  [[1, 1], [2.756, 0.4], [5.404, 0.1]].forEach(([ratio, amp]) => {
    const osc = c.createOscillator(), g = c.createGain()
    g.gain.value = amp; osc.type = 'sine'
    osc.frequency.value = freq * ratio
    osc.connect(g); g.connect(master)
    osc.start(t); osc.stop(t + 1.0)
  })
}

// ── Cosmic: 8-bit square wave blip ──────────────────────────────────────
function squareBeep(freq, vol = 0.07, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.setValueAtTime(vol * 0.55, t + 0.04)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'square'
  osc.frequency.setValueAtTime(freq * 1.6, t)
  osc.frequency.setValueAtTime(freq, t + 0.04)
  osc.connect(g); osc.start(t); osc.stop(t + 0.22)
}

// ── Ocean: water drop — absolute pitch fall 1400Hz → 80Hz ───────────────
// Using absolute frequencies so every press makes an unmistakable "bloop"
// regardless of which button index is passed.
function waterDrop(_freq, vol = 0.13, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  // Noise splash transient
  try {
    const len = Math.ceil(c.sampleRate * 0.06)
    const buf = c.createBuffer(1, len, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    const noise = c.createBufferSource(); noise.buffer = buf
    const nf = c.createBiquadFilter()
    nf.type = 'bandpass'; nf.frequency.value = 1800; nf.Q.value = 0.4
    const ng = c.createGain()
    ng.gain.setValueAtTime(vol * 0.9, t)
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)
    noise.connect(nf); nf.connect(ng); ng.connect(c.destination)
    noise.start(t)
  } catch (_) {}
  // Pitch-falling resonance tone
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(1400, t)      // always start at 1400 Hz
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.32)  // always land at 80 Hz
  osc.connect(g); osc.start(t); osc.stop(t + 0.55)
}

// ── Crimson Dusk: hard-clipped sawtooth → distorted guitar crunch ────────
function guitarTwang(_freq, vol = 0.07, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  // Hard-clip waveshaper — turns sawtooth into gritty distortion
  const ws = c.createWaveShaper()
  const n = 512; const curve = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const x = (i * 2 / n) - 1
    curve[i] = Math.max(-0.55, Math.min(0.55, x * 10))
  }
  ws.curve = curve
  // Low-pass sweeps hard down — the "wah" on the crunch
  const filt = c.createBiquadFilter()
  filt.type = 'lowpass'; filt.Q.value = 4
  filt.frequency.setValueAtTime(3500, t)
  filt.frequency.exponentialRampToValueAtTime(180, t + 0.55)
  const g = c.createGain()
  g.gain.setValueAtTime(vol * 0.35, t)   // waveshaper adds gain; compensate
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65)
  ws.connect(filt); filt.connect(g); g.connect(c.destination)
  // Two sawtooth strings a perfect fifth apart, both capped low
  const base = 110  // always low register — guitar lives here
  ;[1, 1.498].forEach(ratio => {
    const osc = c.createOscillator(), gg = c.createGain()
    osc.type = 'sawtooth'; osc.frequency.value = base * ratio
    gg.gain.value = 0.7
    osc.connect(gg); gg.connect(ws)
    osc.start(t); osc.stop(t + 0.7)
  })
}

// ── Forest: wooden marimba — sine + fast-decaying 4th harmonic ──────────
// The 4th harmonic (4:1) decaying in 80 ms is the acoustic signature
// of struck wood — immediately distinct from any sustained tone.
function marimba(freq, vol = 0.11, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  // Fundamental — medium decay
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(vol * 0.25, t + 0.06)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sine'; osc.frequency.value = freq
  osc.connect(g); osc.start(t); osc.stop(t + 0.6)
  // 4th harmonic — decays very fast (gives the "clunk" attack)
  const osc2 = c.createOscillator(), g2 = c.createGain()
  g2.gain.setValueAtTime(vol * 0.7, t)
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.08)
  osc2.type = 'sine'; osc2.frequency.value = freq * 4
  osc2.connect(g2); g2.connect(c.destination)
  osc2.start(t); osc2.stop(t + 0.1)
}

// ── Moonlight: glass harmonica — three detuned sines, very long decay ────
// Micro-detuning creates a slow shimmer beat (≈8 Hz) that is instantly
// recognisable as crystalline / glass.  Long tail reinforces the effect.
function glassHarp(freq, vol = 0.065, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const base = freq * 2   // bright upper register
  ;[1, 1.009, 0.992].forEach(detune => {
    const g = c.createGain()
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2)   // very long tail
    g.connect(c.destination)
    const osc = c.createOscillator()
    osc.type = 'sine'; osc.frequency.value = base * detune
    osc.connect(g); osc.start(t); osc.stop(t + 2.4)
  })
}

// ── Hover tick ───────────────────────────────────────────────────────────
function tick(vol = 0.025) {
  const c = getCtx(), t = c.currentTime
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = currentTheme === 'purple' ? 'square' : 'sine'
  osc.frequency.value = currentTheme === 'teal' ? 1200
    : currentTheme === 'crimson' ? 300
    : currentTheme === 'silver' ? 2000
    : 1400
  osc.connect(g); osc.start(t); osc.stop(t + 0.12)
}

function synthFor(theme) {
  switch (theme) {
    case 'purple':  return squareBeep
    case 'teal':    return waterDrop
    case 'crimson': return guitarTwang
    case 'emerald': return marimba
    case 'silver':  return glassHarp
    default:        return bell
  }
}

export function playSound(type, idx = 0) {
  if (muted) return
  try {
    if (type === 'hover') { tick(0.025); return }
    const play = synthFor(currentTheme)
    switch (type) {
      case 'number': play(PENTA[idx % PENTA.length], 0.10); break
      case 'op':     play(PENTA[(idx + 4) % PENTA.length] * 1.25, 0.12); break
      case 'eq':     [0, 2, 5].forEach((n, j) => play(PENTA[n], 0.11, j * 0.13)); break
      case 'clr':    play(PENTA[0] * 0.5, 0.10); break
    }
  } catch (_) {}
}
