import React, { useState, useRef, useEffect } from 'react'
import './Home.css'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'
import edmImage from '../assets/edm.jpg'
import festivalImage from '../assets/festival.jpg'
import partyImage from '../assets/party.jpg'
import martinImage from '../assets/martin.jpg'
import arminImage from '../assets/armin.jpg'
import tiestoImage from '../assets/tiesto.jpg'
import musicImage from '../assets/music.jpg'

function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [])

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="home">
      <aside className="sidebar">
        <h2 className="sidebar-title">Tu biblioteca</h2>
        <ul className="sidebar-list">
          <li className="sidebar-item active">Tus me gusta</li>
          <li className="sidebar-item">Martin Garrix</li>
          <li className="sidebar-item">Armin van Buuren</li>
          <li className="sidebar-item">Tiësto</li>
          <li className="sidebar-item">Hardwell</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="playlists-header">
          <h1 className="section-title">Playlists de Música Electrónica</h1>
          <div className="playlists-header-right">
            <div className="top-row">
              <input
                type="search"
                placeholder="Buscar música electrónica, artistas..."
                className="search-input"
                aria-label="Buscar música electrónica, artistas, podcasts"
              />
              <span className="user-name">Erick Magaña</span>
            </div>
            <section className="settings-box">
              <h2 className="settings-title">Configuración de Spotify</h2>
              <ul className="settings-list">
                <li className="settings-item">Crear playlist</li>
                <li className="settings-item">Ver historial de reproducción</li>
                <li className="settings-item">Configuración de audio</li>
                <li className="settings-item">Modo oscuro</li>
                <li className="settings-item">Conectar con dispositivo</li>
              </ul>
            </section>
          </div>
        </header>

        <section>
          <div className="playlists-grid">
            <article className="playlist-card">
              <img src={edmImage} alt="EDM Hits" className="playlist-image" />
              <p className="playlist-title">EDM Hits</p>
            </article>
            <article className="playlist-card">
              <img src={festivalImage} alt="Festival Anthems" className="playlist-image" />
              <p className="playlist-title">Festival Anthems</p>
            </article>
            <article className="playlist-card">
              <img src={partyImage} alt="Electro Party" className="playlist-image" />
              <p className="playlist-title">Electro Party</p>
            </article>
          </div>
        </section>

        <section>
          <h1 className="section-title">Nuevos Lanzamientos</h1>
          <div className="playlists-grid">
            <article className="playlist-card">
              <img src={martinImage} alt="Martin Garrix - New Release" className="playlist-image" />
              <p className="playlist-title">Martin Garrix - New Release</p>
            </article>
            <article className="playlist-card">
              <img src={arminImage} alt="Armin van Buuren - New Release" className="playlist-image" />
              <p className="playlist-title">Armin van Buuren - New Release</p>
            </article>
            <article className="playlist-card">
              <img src={tiestoImage} alt="Tiësto - New Release" className="playlist-image" />
              <p className="playlist-title">Tiësto - New Release</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="modern-player">
        <div className="track-info">
          <img src={musicImage} alt="SoundHelix Song 1 - SoundHelix" className="cover-img" />
          <div>
            <p className="player-song">SoundHelix Song 1</p>
            <p className="player-artist">SoundHelix</p>
          </div>
        </div>

        <div className="controls">
          <button onClick={() => alert('Anterior')} className="icon">
            <FaStepBackward />
          </button>
          <button onClick={togglePlay} className="icon main-btn">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => alert('Siguiente')} className="icon">
            <FaStepForward />
          </button>
        </div>

        <div className="progress-area">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={e => {
              if (audioRef.current) {
                audioRef.current.currentTime = e.target.value
                setCurrentTime(e.target.value)
              }
            }}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>

        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
      </footer>
    </div>
  )
}

export default Home
