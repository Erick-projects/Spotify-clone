import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import './App.css'

function App() {
  return (
    <>
      <header className="app-header">
        <div className="container header-container">
          <Link to="/" className="logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
              alt="Spotify Logo"
              style={{ height: '40px' }}
            />
          </Link>
          <nav>
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/register" className="nav-link nav-link-button">Registrarme</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
