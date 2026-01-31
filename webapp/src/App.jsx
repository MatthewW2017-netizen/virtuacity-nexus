import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import SystemPage from './pages/SystemPage'

export default function App(){
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><img src="/assets/logo.svg" alt="Nexus OS logo" className="logo" width="180" height="36" /><span className="studio">Virtua City Studio</span></div>
        <nav className="top-actions"><Link to="/" className="btn outlined">Home</Link></nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/systems/:id" element={<SystemPage/>} />
        </Routes>
      </main>
    </div>
  )
}
