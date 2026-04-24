import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '图像质量用户研究',
  description: '硕士论文图像偏好 A/B 对比实验',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
