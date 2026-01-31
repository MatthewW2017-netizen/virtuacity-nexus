import React from 'react'
import { useParams, Link } from 'react-router-dom'
import systems from '../data/systems'

export default function SystemPage(){
  const { id } = useParams()
  const sys = systems.find(s=>s.id===id)
  if(!sys) return (
    <div className="stage"><h2>Not found</h2><p>System "{id}" not found.</p><Link to="/">Back</Link></div>
  )
  return (
    <div className="stage">
      <section className="hero">
        <h1 className="title">{sys.title}</h1>
        <p className="subtitle">{sys.subtitle}</p>
      </section>
      <section className="what-is">
        <h2>Overview</h2>
        <p>{sys.overview}</p>
        <ul className="pill-list">
          {sys.features.map((f,i)=>(<li key={i}>{f}</li>))}
        </ul>
      </section>
      <section className="systems">
        <h2>Integration</h2>
        <div className="card">{sys.integration}</div>
      </section>
      <footer className="footer"><div className="links"><Link to="/">Back to App Home</Link></div></footer>
    </div>
  )
}
