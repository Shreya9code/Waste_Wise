import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Toaster } from '@/components/ui/use-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcoWaste - Manage Waste, Live Sustainably',
  description: 'Join the movement towards a cleaner, greener future with EcoWaste.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-green-800 text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">EcoWaste</Link>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/#features" className="hover:underline">Features</Link></li>
                <li><Link href="/#learn" className="hover:underline">Learn</Link></li>
                <li><Link href="/#contact" className="hover:underline">Contact</Link></li>
                <li><Link href="/auth" className="hover:underline">Login/Register</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-green-800 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 EcoWaste. All rights reserved.</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}