import Calculator from './Calculator'
import NightSprites from './NightSprites'
import Swirls from './Swirls'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <div className="sky" />
      <Swirls />
      <svg className="silhouette" viewBox="0 0 800 220" preserveAspectRatio="none">
        {/* Rolling hills */}
        <path d="M0,140 Q80,80 180,110 Q280,140 380,90 Q480,40 580,80 Q680,120 800,95 L800,220 L0,220 Z" fill="#060e24"/>
        {/* Cypress tree left */}
        <ellipse cx="72" cy="110" rx="18" ry="75" fill="#040c1c"/>
        <ellipse cx="72" cy="130" rx="22" ry="60" fill="#050d1e"/>
        <ellipse cx="68" cy="95"  rx="14" ry="50" fill="#040b1a"/>
        {/* Village buildings right */}
        <rect x="550" y="115" width="50" height="65" fill="#060e20"/>
        <polygon points="550,115 575,78 600,115" fill="#070f22"/>
        <rect x="605" y="130" width="38" height="50" fill="#050d1e"/>
        <rect x="648" y="138" width="30" height="42" fill="#060e20"/>
        <rect x="508" y="128" width="36" height="52" fill="#050c1e"/>
        {/* Village window lights */}
        <rect x="560" y="138" width="8" height="8" fill="#f5d02044" rx="1"/>
        <rect x="578" y="138" width="8" height="8" fill="#f5d02044" rx="1"/>
        <rect x="614" y="148" width="7" height="7" fill="#f5d02033" rx="1"/>
        <rect x="516" y="144" width="7" height="8" fill="#f5d02033" rx="1"/>
        {/* Church spire cross */}
        <rect x="573" y="60" width="4" height="18" fill="#070f22"/>
        <rect x="568" y="66" width="14" height="4"  fill="#070f22"/>
      </svg>
      <div className="scene">
        <Calculator />
      </div>
      <NightSprites />
    </div>
  )
}
