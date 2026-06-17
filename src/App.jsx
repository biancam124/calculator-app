import { useState } from 'react'
import Calculator from './Calculator'
import FarmSprites from './FarmSprites'
import Clouds from './Clouds'
import WeatherFX from './Weather'
import SeasonPanel from './SeasonPanel'
import './App.css'

export default function App() {
  const [season, setSeason]   = useState('spring')
  const [weather, setWeather] = useState('sunny')

  return (
    <div className={`app season-${season} weather-${weather}`}>
      <div className="sky" />
      <Clouds weather={weather} />
      <div className="mountains" />
      <div className="grass" />

      <WeatherFX weather={weather} />

      <div className="scene">
        <Calculator />
      </div>

      <FarmSprites season={season} />
      <SeasonPanel season={season} weather={weather} onSeason={setSeason} onWeather={setWeather} />
    </div>
  )
}
