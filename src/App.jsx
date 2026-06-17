import { useState } from 'react'
import Calculator from './Calculator'
import NightSprites from './NightSprites'
import Swirls from './Swirls'
import CustomPanel from './CustomPanel'
import Silhouette from './Silhouette'
import './App.css'

export default function App() {
  const [calcName, setCalcName] = useState('✦ Starry Night ✦')
  const [font,     setFont]     = useState('pixel')
  const [theme,    setTheme]    = useState('night')

  return (
    <div className={`app theme-${theme}`}>
      <div className="sky" />
      <Swirls />
      <Silhouette theme={theme} />

      <div className="scene">
        <Calculator name={calcName} font={font} theme={theme} />
      </div>

      <NightSprites theme={theme} />
      <CustomPanel
        name={calcName} font={font} theme={theme}
        onName={setCalcName} onFont={setFont} onTheme={setTheme}
      />
    </div>
  )
}
