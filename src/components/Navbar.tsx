import React from 'react'

export default function Navbar(){
  return (
    <nav className="w-full bg-white/3 p-4 border-b border-white/5">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="font-black">VirtuaCity</div>
        <div className="space-x-3">
          <a href="/" className="text-sm text-gray-300">Home</a>
          <a href="/rebuild" className="text-sm text-gray-300">Rebuild</a>
          <a href="/nexus" className="text-sm text-gray-300">Nexus</a>
        </div>
      </div>
    </nav>
  )
}
