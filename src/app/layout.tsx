import './globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'VirtuaCity Nexus',
  description: 'Minimal scaffold'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="max-w-4xl mx-auto">{children}</div>
      </body>
    </html>
  )
}
