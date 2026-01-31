import React from 'react'
import systems from '../data/systems'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="stage">
      <section className="hero">
        <h1 className="title">Nexus OS — App (Prototype)</h1>
        <p className="subtitle">Website-first, app-second control center for Cities, RP, Studios, Creators, Bots and Mini‑Apps.</p>
      </section>

      <section className="systems">
        <h2>Systems</h2>
        <div className="grid core-grid">
          {systems.map(s=> (
            <Link key={s.id} to={`/systems/${s.id}`} className="card">
              <h3>{s.title}</h3>
              <p>{s.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
