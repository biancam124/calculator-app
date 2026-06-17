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

// ── Starry Night: ethereal bell with inharmonic overtones ────────────────
function bell(freq, vol = 0.09, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const master = c.createGain()
  master.gain.setValueAtTime(vol, t)
  master.gain.exponentialRampToValueAtTime(0.0001, t + 0.65)
  master.connect(c.destination)
  [[1, 1], [2.756, 0.35], [5.404, 0.08]].forEach(([ratio, amp]) => {
    const osc = c.createOscillator(), g = c.createGain()
    g.gain.value = amp; osc.type = 'sine'; osc.frequency.value = freq * ratio
    osc.connect(g); g.connect(master); osc.start(t); osc.stop(t + 0.75)
  })
}

// ── Cosmic: retro 8-bit square wave beep ────────────────────────────────
function squareBeep(freq, vol = 0.05, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.setValueAtTime(vol * 0.6, t + 0.04)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'square'; osc.frequency.value = freq
  osc.connect(g); osc.start(t); osc.stop(t + 0.22)
}

// ── Ocean: water-drop pluck with descending pitch bend ───────────────────
function waterDrop(freq, vol = 0.07, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq * 2.4, t)
  osc.frequency.exponentialRampToValueAtTime(freq * 0.55, t + 0.28)
  osc.connect(g); osc.start(t); osc.stop(t + 0.46)
}

// ── Crimson Dusk: sawtooth through lowpass filter → guitar twang ─────────
function guitarTwang(freq, vol = 0.07, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const filt = c.createBiquadFilter()
  filt.type = 'lowpass'
  filt.frequency.setValueAtTime(3200, t)
  filt.frequency.exponentialRampToValueAtTime(550, t + 0.45)
  filt.Q.value = 2
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55)
  filt.connect(g); g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sawtooth'; osc.frequency.value = freq
  osc.connect(filt); osc.start(t); osc.stop(t + 0.6)
}

// ── Forest: pan flute — soft sine attack + breathy noise layer ───────────
function panFlute(freq, vol = 0.07, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(vol, t + 0.055)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.72)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sine'; osc.frequency.value = freq
  osc.connect(g); osc.start(t); osc.stop(t + 0.76)
  // breath noise
  try {
    const len = Math.ceil(c.sampleRate * 0.28)
    const buf = c.createBuffer(1, len, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    const noise = c.createBufferSource(); noise.buffer = buf
    const nf = c.createBiquadFilter()
    nf.type = 'bandpass'; nf.frequency.value = freq * 2.8; nf.Q.value = 1
    const ng = c.createGain()
    ng.gain.setValueAtTime(0, t)
    ng.gain.linearRampToValueAtTime(vol * 0.14, t + 0.05)
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.22)
    noise.connect(nf); nf.connect(ng); ng.connect(c.destination)
    noise.start(t)
  } catch (_) {}
}

// ── Moonlight: music-box — high pure sine, clean glassy decay ────────────
function musicBox(freq, vol = 0.08, delay = 0) {
  const c = getCtx(), t = c.currentTime + delay
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.95)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sine'; osc.frequency.value = freq * 2   // bright octave
  osc.connect(g); osc.start(t); osc.stop(t + 1.0)
  // faint upper partial
  const osc2 = c.createOscillator(), g2 = c.createGain()
  g2.gain.value = 0.1; osc2.type = 'sine'; osc2.frequency.value = freq * 6
  osc2.connect(g2); g2.connect(g); osc2.start(t); osc2.stop(t + 0.35)
}

// ── Hover tick: theme-tinted subtle chime ───────────────────────────────
function tick(freq, vol = 0.022) {
  const c = getCtx(), t = c.currentTime
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = currentTheme === 'purple' ? 'square' : 'sine'
  osc.frequency.value = freq
  osc.connect(g); osc.start(t); osc.stop(t + 0.18)
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
      tick(PENTA[(idx + 3) % PENTA.length] * 1.5, 0.022)
      return
    }
    const play = synthFor(currentTheme)
    switch (type) {
      case 'number': play(PENTA[idx % PENTA.length], 0.08); break
      case 'op':     play(PENTA[(idx + 4) % PENTA.length] * 1.25, 0.10); break
      case 'eq':     [0, 2, 5].forEach((n, j) => play(PENTA[n], 0.09, j * 0.10)); break
      case 'clr':    play(PENTA[0] * 0.5, 0.08); break
    }
  } catch (_) {}
}
