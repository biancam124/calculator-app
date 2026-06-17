import { useState } from 'react'
import { playSound } from './useSound'

const BUTTONS = [
  ['C', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]
const OPS = new Set(['÷', '×', '−', '+'])

export default function Calculator({ name, font }) {
  const [display, setDisplay]           = useState('0')
  const [prev, setPrev]                 = useState(null)
  const [op, setOp]                     = useState(null)
  const [waitingForOperand, setWaiting] = useState(false)

  function calculate(a, b, operator) {
    switch (operator) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default:  return b
    }
  }

  function handleButton(label, idx) {
    // Sound
    if (label === 'C')          playSound('clr', idx)
    else if (label === '=')     playSound('eq',  idx)
    else if (OPS.has(label))    playSound('op',  idx)
    else                        playSound('number', idx)

    // Logic
    if (label === 'C') {
      setDisplay('0'); setPrev(null); setOp(null); setWaiting(false); return
    }
    if (label === '+/-') { setDisplay(d => String(parseFloat(d) * -1)); return }
    if (label === '%')   { setDisplay(d => String(parseFloat(d) / 100)); return }

    if (OPS.has(label)) {
      const cur = parseFloat(display)
      if (prev !== null && !waitingForOperand) {
        const r = calculate(prev, cur, op)
        setDisplay(String(r)); setPrev(r)
      } else { setPrev(cur) }
      setOp(label); setWaiting(true); return
    }

    if (label === '=') {
      if (op === null || prev === null) return
      const r = calculate(prev, parseFloat(display), op)
      setDisplay(String(r)); setPrev(null); setOp(null); setWaiting(false); return
    }

    if (label === '.') {
      if (waitingForOperand) { setDisplay('0.'); setWaiting(false); return }
      if (!display.includes('.')) setDisplay(d => d + '.')
      return
    }

    if (waitingForOperand) { setDisplay(label); setWaiting(false) }
    else { setDisplay(d => d === '0' ? label : d + label) }
  }

  function btnClass(label) {
    if (label === '0') return 'btn wide'
    if (OPS.has(label) || label === '=') return 'btn accent'
    if (['C', '+/-', '%'].includes(label)) return 'btn muted'
    return 'btn'
  }

  return (
    <div className={`calc font-${font || 'pixel'}`}>
      <div className="calc-title">{name || '✦ Starry Night ✦'}</div>
      <div className="display">
        <div className="display-label">VALUE</div>
        <span>{display}</span>
      </div>
      <div className="grid">
        {BUTTONS.flat().map((label, i) => (
          <button key={i} className={btnClass(label)}
            onClick={() => handleButton(label, i)}
            onMouseEnter={() => playSound('hover', i)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
