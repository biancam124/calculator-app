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

// ── Starry Night: inharmonic bell, long sustain ──────────────────────────
function bell(freq, vol, delay = 0) {
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

// ── Ocean: 1400 → 80 Hz bloop (absolute, same every press) ──────────────
function waterDrop(_freq, vol, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  try {
    const len = Math.ceil(c.sampleRate * 0.05)
    const buf = c.createBuffer(1, len, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    const noise = c.createBufferSource(); noise.buffer = buf
    const nf = c.createBiquadFilter()
    nf.type = 'bandpass'; nf.frequency.value = 1800; nf.Q.value = 0.4
    const ng = c.createGain()
    ng.gain.setValueAtTime(vol * 0.8, t)
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
    noise.connect(nf); nf.connect(ng); ng.connect(c.destination)
    noise.start(t)
  } catch (_) {}
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(1400, t)
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.32)
  osc.connect(g); osc.start(t); osc.stop(t + 0.55)
}

// ── Crimson Dusk: hard-clipped sawtooth → distorted guitar crunch ────────
function guitarTwang(_freq, vol, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const ws = c.createWaveShaper()
  const curve = new Float32Array(512)
  for (let i = 0; i < 512; i++) {
    const x = (i * 2 / 512) - 1
    curve[i] = Math.max(-0.55, Math.min(0.55, x * 10))
  }
  ws.curve = curve
  const filt = c.createBiquadFilter()
  filt.type = 'lowpass'; filt.Q.value = 4
  filt.frequency.setValueAtTime(3500, t)
  filt.frequency.exponentialRampToValueAtTime(180, t + 0.55)
  const g = c.createGain()
  g.gain.setValueAtTime(vol * 0.35, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65)
  ws.connect(filt); filt.connect(g); g.connect(c.destination)
  ;[1, 1.498].forEach(ratio => {
    const osc = c.createOscillator(), gg = c.createGain()
    osc.type = 'sawtooth'; osc.frequency.value = 110 * ratio; gg.gain.value = 0.7
    osc.connect(gg); gg.connect(ws); osc.start(t); osc.stop(t + 0.7)
  })
}

// ── Forest: unfiltered white noise burst — pure static, no pitch ─────────
// Impossible to confuse with any pitched sound.
function noiseBurst(_freq, vol, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  try {
    const len = Math.ceil(c.sampleRate * 0.18)
    const buf = c.createBuffer(1, len, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    const noise = c.createBufferSource(); noise.buffer = buf
    const g = c.createGain()
    g.gain.setValueAtTime(vol * 0.9, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
    noise.connect(g); g.connect(c.destination)
    noise.start(t)
  } catch (_) {}
}

// ── Moonlight: three detuned sines — glassy shimmer, long tail ───────────
function glassHarp(freq, vol, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const base = freq * 2
  ;[1, 1.009, 0.992].forEach(detune => {
    const g = c.createGain()
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2)
    g.connect(c.destination)
    const osc = c.createOscillator()
    osc.type = 'sine'; osc.frequency.value = base * detune
    osc.connect(g); osc.start(t); osc.stop(t + 2.4)
  })
}

function synthFor(theme) {
  switch (theme) {
    case 'purple':  return squareBeep
    case 'teal':    return waterDrop
    case 'crimson': return guitarTwang
    case 'emerald': return noiseBurst
    case 'silver':  return glassHarp
    default:        return bell
  }
}

// theme is passed explicitly — no module state needed
export function playSound(type, idx = 0, theme = 'night') {
  if (muted) return
  try {
    if (type === 'hover') {
      const c = getCtx(), t = c.currentTime
      const g = c.createGain()
      g.gain.setValueAtTime(0.022, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
      g.connect(c.destination)
      const osc = c.createOscillator()
      osc.type = theme === 'purple' ? 'square' : 'sine'
      osc.frequency.value = 1400
      osc.connect(g); osc.start(t); osc.stop(t + 0.12)
      return
    }
    const play = synthFor(theme)
    switch (type) {
      case 'number': play(PENTA[idx % PENTA.length], 0.10); break
      case 'op':     play(PENTA[(idx + 4) % PENTA.length] * 1.25, 0.12); break
      case 'eq':     [0, 2, 5].forEach((n, j) => play(PENTA[n], 0.11, j * 0.13)); break
      case 'clr':    play(PENTA[0] * 0.5, 0.10); break
    }
  } catch (_) {}
}
