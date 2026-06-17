import { useState } from 'react'

const buttons = [
  ['C', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]

const ops = new Set(['÷', '×', '−', '+'])

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  function calculate(a, b, operator) {
    switch (operator) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default: return b
    }
  }

  function handleButton(label) {
    if (label === 'C') {
      setDisplay('0'); setPrev(null); setOp(null); setWaitingForOperand(false); return
    }
    if (label === '+/-') { setDisplay(d => String(parseFloat(d) * -1)); return }
    if (label === '%') { setDisplay(d => String(parseFloat(d) / 100)); return }

    if (ops.has(label)) {
      const current = parseFloat(display)
      if (prev !== null && !waitingForOperand) {
        const result = calculate(prev, current, op)
        setDisplay(String(result)); setPrev(result)
      } else {
        setPrev(current)
      }
      setOp(label); setWaitingForOperand(true); return
    }

    if (label === '=') {
      if (op === null || prev === null) return
      const result = calculate(prev, parseFloat(display), op)
      setDisplay(String(result)); setPrev(null); setOp(null); setWaitingForOperand(false); return
    }

    if (label === '.') {
      if (waitingForOperand) { setDisplay('0.'); setWaitingForOperand(false); return }
      if (!display.includes('.')) setDisplay(d => d + '.')
      return
    }

    if (waitingForOperand) {
      setDisplay(label); setWaitingForOperand(false)
    } else {
      setDisplay(d => d === '0' ? label : d + label)
    }
  }

  function btnClass(label) {
    if (label === '0') return 'btn wide'
    if (ops.has(label) || label === '=') return 'btn accent'
    if (['C', '+/-', '%'].includes(label)) return 'btn muted'
    return 'btn'
  }

  return (
    <div className="calc">
      <div className="calc-title">✦ Starry Night ✦</div>
      <div className="display">
        <div className="display-label">VALUE</div>
        <span>{display}</span>
      </div>
      <div className="grid">
        {buttons.flat().map((label, i) => (
          <button key={i} className={btnClass(label)} onClick={() => handleButton(label)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
