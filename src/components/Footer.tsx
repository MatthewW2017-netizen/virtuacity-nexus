import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-nexus-dark border-t border-nexus-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-nexus-indigo rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tighter">
                VIRTUA<span className="text-nexus-indigo">CITY</span> NEXUS
              </span>
            </Link>
            <p className="text-gray-400 max-w-xs text-sm">
              The front door of the entire Nexus platform. Build, connect, and explore in the next generation of virtual worlds.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="text-gray-400 hover:text-nexus-indigo transition-colors">Features</Link></li>
              <li><Link href="/bot-forge" className="text-gray-400 hover:text-nexus-indigo transition-colors">Bot Forge</Link></li>
              <li><Link href="/studio-os" className="text-gray-400 hover:text-nexus-indigo transition-colors">Studio OS</Link></li>
              <li><Link href="/ai" className="text-gray-400 hover:text-nexus-indigo transition-colors">AETHERYX AI</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/early-access" className="text-gray-400 hover:text-nexus-indigo transition-colors">Early Access</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-nexus-indigo transition-colors">Discord</a></li>
              <li><a href="#" className="text-gray-400 hover:text-nexus-indigo transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-nexus-indigo transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-nexus-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 VirtuaCity Nexus. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
