export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold">VirtuaCity Nexus</div>
        <nav className="space-x-4 text-sm text-gray-600">
          <a href="/nexus">Nexus</a>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
        </nav>
      </div>
    </header>
  )
}
