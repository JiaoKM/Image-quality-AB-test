'use client'

type Choice = 'left' | 'right' | 'similar'

interface ChoiceButtonsProps {
  onChoice: (choice: Choice) => void
  disabled: boolean
  selected: Choice | null
}

const BUTTONS: { value: Choice; label: string }[] = [
  { value: 'left',    label: '左图更好' },
  { value: 'similar', label: '差不多 / 无偏好' },
  { value: 'right',   label: '右图更好' },
]

export default function ChoiceButtons({
  onChoice,
  disabled,
  selected,
}: ChoiceButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
      {BUTTONS.map(({ value, label }) => {
        const isSelected = selected === value
        return (
          <button
            key={value}
            onClick={() => !disabled && onChoice(value)}
            disabled={disabled}
            aria-pressed={isSelected}
            className={[
              'px-8 py-3 rounded-lg font-medium text-base transition-all duration-150',
              'border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400',
              isSelected
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50',
              disabled && !isSelected
                ? 'opacity-40 cursor-not-allowed'
                : 'cursor-pointer',
            ].join(' ')}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
