'use client'

import { useEffect } from 'react'
import { clearSession } from '@/lib/randomize'
import { useLang } from '@/lib/i18n'

export default function DonePage() {
  const { t } = useLang()

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
      <h1 className="text-3xl font-bold text-gray-900">{t.done.title}</h1>
      <p className="text-lg text-gray-600 max-w-prose">{t.done.body}</p>
      <p className="text-gray-400 text-sm">{t.done.close}</p>
    </div>
  )
}
