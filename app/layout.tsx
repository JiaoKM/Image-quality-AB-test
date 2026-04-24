import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image Quality Study',
  description: 'A/B image preference study',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Providers>
          <div className="max-w-5xl mx-auto px-4 py-6">
            <Header />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
