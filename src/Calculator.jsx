import { useState, useEffect } from 'react'
import { playSound } from './useSound'

const BUTTONS = [
  ['C', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]
const OPS = new Set(['÷', '×', '−', '+'])

export default function Calculator({ name, font, theme }) {
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
    if (label === 'C')          playSound('clr',    idx, theme)
    else if (label === '=')     playSound('eq',     idx, theme)
    else if (OPS.has(label))    playSound('op',     idx, theme)
    else                        playSound('number', idx, theme)

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

  useEffect(() => {
    const KEY_MAP = {
      '0':'0','1':'1','2':'2','3':'3','4':'4',
      '5':'5','6':'6','7':'7','8':'8','9':'9',
      '.':'.','Enter':'=','=':'=',
      '+':'+','-':'−','*':'×','/':'÷',
      'Escape':'C','Backspace':'Backspace','%':'%',
    }
    function onKey(e) {
      const label = KEY_MAP[e.key]
      if (!label) return
      e.preventDefault()
      if (label === 'Backspace') {
        setDisplay(d => d.length > 1 ? d.slice(0, -1) : '0')
        playSound('clr', 0, theme)
        return
      }
      const flat = BUTTONS.flat()
      const idx = flat.indexOf(label)
      handleButton(label, idx >= 0 ? idx : 0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [display, prev, op, waitingForOperand, theme])

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
            onMouseEnter={() => playSound('hover', i, theme)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
