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

// ── Cosmic: 8-bit square wave with upward pitch blip ────────────────────
function squareBeep(freq, vol = 0.07, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.setValueAtTime(vol * 0.55, t + 0.04)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'square'
  // blip up then snap back — classic arcade feel
  osc.frequency.setValueAtTime(freq * 1.6, t)
  osc.frequency.setValueAtTime(freq, t + 0.04)
  osc.connect(g); osc.start(t); osc.stop(t + 0.22)
}

// ── Ocean: dramatic bloop — high sine falls an octave and a half down ───
function waterDrop(freq, vol = 0.11, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sine'
  // start very high, fall steeply — unmistakable "bloop"
  osc.frequency.setValueAtTime(freq * 4.5, t)
  osc.frequency.exponentialRampToValueAtTime(freq * 0.35, t + 0.38)
  osc.connect(g); osc.start(t); osc.stop(t + 0.6)
}

// ── Crimson Dusk: sawtooth through aggressive sweeping filter ───────────
// Lower octave + steep LP sweep gives a clear "twang" character
function guitarTwang(freq, vol = 0.09, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const filt = c.createBiquadFilter()
  filt.type = 'lowpass'
  filt.frequency.setValueAtTime(4000, t)
  filt.frequency.exponentialRampToValueAtTime(200, t + 0.5)
  filt.Q.value = 5  // resonant peak for "twang" colour
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65)
  filt.connect(g); g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sawtooth'
  osc.frequency.value = freq * 0.5   // drop an octave — guitar lives low
  osc.connect(filt); osc.start(t); osc.stop(t + 0.7)
}

// ── Forest: pan flute — soft attack + prominent breath + vibrato ─────────
function panFlute(freq, vol = 0.08, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(vol, t + 0.09)     // slow, breathy entry
  g.gain.setValueAtTime(vol * 0.85, t + 0.35)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.75)
  g.connect(c.destination)
  // vibrato LFO
  const lfo = c.createOscillator(), lfoG = c.createGain()
  lfo.frequency.value = 5.5; lfoG.gain.value = freq * 0.03
  lfo.connect(lfoG)
  const osc = c.createOscillator()
  osc.type = 'sine'; osc.frequency.value = freq
  lfoG.connect(osc.frequency)   // modulate pitch ±3%
  osc.connect(g)
  lfo.start(t); lfo.stop(t + 0.8)
  osc.start(t); osc.stop(t + 0.8)
  // loud breath noise — the defining flute quality
  try {
    const len = Math.ceil(c.sampleRate * 0.4)
    const buf = c.createBuffer(1, len, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    const noise = c.createBufferSource(); noise.buffer = buf
    const nf = c.createBiquadFilter()
    nf.type = 'bandpass'; nf.frequency.value = freq * 2.5; nf.Q.value = 0.6
    const ng = c.createGain()
    ng.gain.setValueAtTime(0, t)
    ng.gain.linearRampToValueAtTime(vol * 0.45, t + 0.06)  // very audible breath
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.35)
    noise.connect(nf); nf.connect(ng); ng.connect(c.destination)
    noise.start(t)
  } catch (_) {}
}

// ── Moonlight: music box — triangle wave tine, bright & metallic ─────────
function musicBox(freq, vol = 0.10, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  // Fundamental tine (triangle = sweeter, less harsh than sine)
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'triangle'
  osc.frequency.value = freq * 2.5   // bright high register
  osc.connect(g); osc.start(t); osc.stop(t + 1.3)
  // Inharmonic partial — gives music-box tine its metallic ring
  const osc2 = c.createOscillator(), g2 = c.createGain()
  g2.gain.setValueAtTime(vol * 0.5, t)
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.38)
  osc2.type = 'triangle'
  osc2.frequency.value = freq * 6.8   // inharmonic overtone
  osc2.connect(g2); g2.connect(c.destination)
  osc2.start(t); osc2.stop(t + 0.42)
}

// ── Hover tick: brief sine ping, square for Cosmic ──────────────────────
function tick(freq, vol = 0.025) {
  const c = getCtx(), t = c.currentTime
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = currentTheme === 'purple' ? 'square' : 'sine'
  osc.frequency.value = freq
  osc.connect(g); osc.start(t); osc.stop(t + 0.15)
}

function synthFor(theme) {
  switch (theme) {
    case 'purple':  return squareBeep
    case 'teal':    return waterDrop
    case 'crimson': return guitarTwang
    case 'emerald': return panFlute
    case 'silver':  return musicBox
    default:        return bell
  }
}

export function playSound(type, idx = 0) {
  if (muted) return
  try {
    if (type === 'hover') {
      tick(PENTA[(idx + 3) % PENTA.length] * 1.5, 0.025)
      return
    }
    const play = synthFor(currentTheme)
    switch (type) {
      case 'number': play(PENTA[idx % PENTA.length], 0.09); break
      case 'op':     play(PENTA[(idx + 4) % PENTA.length] * 1.25, 0.11); break
      case 'eq':     [0, 2, 5].forEach((n, j) => play(PENTA[n], 0.10, j * 0.12)); break
      case 'clr':    play(PENTA[0] * 0.5, 0.09); break
    }
  } catch (_) {}
}
