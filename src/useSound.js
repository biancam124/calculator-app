// Pentatonic scale — ethereal/bell-like
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

function bell(freq, vol = 0.09, delay = 0) {
  const c = getCtx()
  const t = c.currentTime + delay
  const master = c.createGain()
  master.gain.setValueAtTime(vol, t)
  master.gain.exponentialRampToValueAtTime(0.0001, t + 0.65)
  master.connect(c.destination)

  // sine + 2 inharmonic overtones give a bell timbre
  [[1, 1], [2.756, 0.35], [5.404, 0.08]].forEach(([ratio, amp]) => {
    const osc = c.createOscillator()
    const g   = c.createGain()
    g.gain.value = amp
    osc.type = 'sine'
    osc.frequency.value = freq * ratio
    osc.connect(g)
    g.connect(master)
    osc.start(t)
    osc.stop(t + 0.75)
  })
}

function tick(freq, vol = 0.025) {
  const c = getCtx()
  const t = c.currentTime
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
  g.connect(c.destination)
  const osc = c.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = freq
  osc.connect(g)
  osc.start(t)
  osc.stop(t + 0.15)
}

export function playSound(type, idx = 0) {
  if (muted) return
  try {
    switch (type) {
      case 'hover':
        tick(PENTA[(idx + 3) % PENTA.length] * 1.5, 0.022)
        break
      case 'number':
        bell(PENTA[idx % PENTA.length], 0.08)
        break
      case 'op':
        bell(PENTA[(idx + 4) % PENTA.length] * 1.25, 0.10)
        break
      case 'eq':
        [0, 2, 5].forEach((n, j) => bell(PENTA[n], 0.09, j * 0.10))
        break
      case 'clr':
        bell(PENTA[0] * 0.5, 0.08)
        break
      default:
        bell(PENTA[idx % PENTA.length], 0.07)
    }
  } catch (_) { /* audio blocked */ }
}
