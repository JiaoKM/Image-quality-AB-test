'use client'

import { useLang } from '@/lib/i18n'

type Choice = 'left' | 'right' | 'similar'

interface ChoiceButtonsProps {
  onChoice: (choice: Choice) => void
  disabled: boolean
  selected: Choice | null
}

export default function ChoiceButtons({ onChoice, disabled, selected }: ChoiceButtonsProps) {
  const { t } = useLang()

  const buttons: { value: Choice; desktopLabel: string; mobileLabel: string }[] = [
    { value: 'left',    desktopLabel: t.study.leftBetter,  mobileLabel: t.study.topBetter },
    { value: 'similar', desktopLabel: t.study.similar,     mobileLabel: t.study.similar },
    { value: 'right',   desktopLabel: t.study.rightBetter, mobileLabel: t.study.bottomBetter },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
      {buttons.map(({ value, desktopLabel, mobileLabel }) => {
        const isSelected = selected === value
        return (
          <button
            key={value}
            onClick={() => !disabled && onChoice(value)}
            disabled={disabled}
            aria-pressed={isSelected}
            className={[
              'px-6 py-3 rounded-lg font-medium text-base transition-all duration-150',
              'border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400',
              isSelected
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50',
              disabled && !isSelected ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
          >
            {/* 桌面显示左/右，手机显示上/下 */}
            <span className="hidden md:inline">{desktopLabel}</span>
            <span className="md:hidden">{mobileLabel}</span>
          </button>
        )
      })}
    </div>
  )
}
