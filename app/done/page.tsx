'use client'

import { useEffect } from 'react'
import { clearSession } from '@/lib/randomize'

export default function DonePage() {
  useEffect(() => {
    clearSession()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 px-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        感谢您的参与！
      </h1>
      <p className="text-lg text-gray-600 max-w-prose">
        您的回答已成功记录。感谢您抽出宝贵时间参与本次研究，
        您的贡献对我们的研究非常重要。
      </p>
      <p className="text-gray-400 text-sm">
        您现在可以关闭此页面。
      </p>
    </div>
  )
}
