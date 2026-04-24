'use client'

import Link from 'next/link'
import { useLang } from '@/lib/i18n'

export default function HomePage() {
  const { t } = useLang()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 px-4">
      <h1 className="text-4xl font-bold text-gray-900">{t.home.title}</h1>
      <p className="text-lg text-gray-600 max-w-prose">{t.home.description}</p>
      <p className="text-sm text-gray-400">{t.home.note}</p>
      <Link
        href="/instructions"
        className="mt-4 px-10 py-3 bg-blue-600 text-white rounded-lg
                   text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        {t.home.start}
      </Link>
    </div>
  )
}
