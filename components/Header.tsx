'use client'

import { useLang } from '@/lib/i18n'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'sv', label: 'SV' },
  { code: 'zh', label: '中' },
] as const

export default function Header() {
  const { lang, setLang } = useLang()

  return (
    <header className="flex justify-end mb-6">
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {LANGS.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={[
              'px-3 py-1 rounded-md text-sm font-medium transition-all',
              lang === code
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  )
}
