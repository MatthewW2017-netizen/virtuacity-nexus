import React from 'react'

export default function Home(){
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">VirtuaCity Nexus</h1>
      <p className="text-gray-300">Clean rebuild — minimal shell. Add features incrementally.</p>
      <div className="p-4 bg-white/5 rounded">
        <h2 className="font-bold">Welcome</h2>
        <p className="text-sm text-gray-400">Use `/rebuild` routes or extend this scaffold.</p>
      </div>
    </div>
  )
}
