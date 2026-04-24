'use client'

import Link from 'next/link'
import { useLang } from '@/lib/i18n'

export default function InstructionsPage() {
  const { t } = useLang()

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 py-4 px-4">
      <h2 className="text-3xl font-bold text-gray-900">{t.instructions.title}</h2>

      <ol className="list-decimal list-inside space-y-4 text-gray-700 text-base">
        {t.instructions.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>

      <p className="text-gray-500 text-sm bg-gray-100 rounded-lg px-4 py-3">
        {t.instructions.hint}
      </p>

      <Link
        href="/study"
        className="self-start px-10 py-3 bg-green-600 text-white rounded-lg
                   font-semibold hover:bg-green-700 transition-colors shadow-md"
      >
        {t.instructions.begin}
      </Link>
    </div>
  )
}
