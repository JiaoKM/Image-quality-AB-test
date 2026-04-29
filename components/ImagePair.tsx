'use client'

import Image from 'next/image'
import { useLang } from '@/lib/i18n'

type Choice = 'left' | 'right' | 'similar'

interface ImagePairProps {
  leftSrc: string
  rightSrc: string
  refSrc?: string
  onChoice: (choice: Choice) => void
  disabled: boolean
  selected: Choice | null
}

function ChoiceBtn({
  value,
  desktopLabel,
  mobileLabel,
  selected,
  disabled,
  onChoice,
}: {
  value: Choice
  desktopLabel: string
  mobileLabel: string
  selected: Choice | null
  disabled: boolean
  onChoice: (c: Choice) => void
}) {
  const isSelected = selected === value
  return (
    <button
      onClick={() => !disabled && onChoice(value)}
      disabled={disabled}
      aria-pressed={isSelected}
      className={[
        'w-full mt-3 px-4 py-3 rounded-lg font-medium text-base transition-all duration-150',
        'border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400',
        isSelected
          ? 'bg-blue-600 border-blue-600 text-white shadow-md'
          : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50',
        disabled && !isSelected ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      <span className="hidden md:inline">{desktopLabel}</span>
      <span className="md:hidden">{mobileLabel}</span>
    </button>
  )
}

export default function ImagePair({
  leftSrc,
  rightSrc,
  refSrc,
  onChoice,
  disabled,
  selected,
}: ImagePairProps) {
  const { t } = useLang()
  const colClass = refSrc ? 'w-full md:w-1/3' : 'w-full md:w-1/2'

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full items-start">
      {/* 左图（桌面左，手机上） */}
      <div className={`flex flex-col items-center ${colClass}`}>
        <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
          <span className="hidden md:inline">{t.img.left}</span>
          <span className="md:hidden">{t.img.top}</span>
        </span>
        <div className="w-full rounded-lg overflow-hidden shadow-md">
          <Image
            src={leftSrc}
            alt={t.img.left}
            width={0}
            height={0}
            sizes={refSrc ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 100vw, 50vw'}
            className="w-full h-auto"
            priority
          />
        </div>
        <ChoiceBtn
          value="left"
          desktopLabel={t.study.leftBetter}
          mobileLabel={t.study.topBetter}
          selected={selected}
          disabled={disabled}
          onChoice={onChoice}
        />
      </div>

      {/* 参考图（桌面中） */}
      {refSrc && (
        <div className="flex flex-col items-center w-full md:w-1/3">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-0.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {t.img.ref}
          </span>
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src={refSrc}
              alt={t.img.ref}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-auto"
              priority
            />
          </div>
          <ChoiceBtn
            value="similar"
            desktopLabel={t.study.similar}
            mobileLabel={t.study.similar}
            selected={selected}
            disabled={disabled}
            onChoice={onChoice}
          />
        </div>
      )}

      {/* 右图（桌面右，手机下） */}
      <div className={`flex flex-col items-center ${colClass}`}>
        <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
          <span className="hidden md:inline">{t.img.right}</span>
          <span className="md:hidden">{t.img.bottom}</span>
        </span>
        <div className="w-full rounded-lg overflow-hidden shadow-md">
          <Image
            src={rightSrc}
            alt={t.img.right}
            width={0}
            height={0}
            sizes={refSrc ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 100vw, 50vw'}
            className="w-full h-auto"
          />
        </div>
        <ChoiceBtn
          value="right"
          desktopLabel={t.study.rightBetter}
          mobileLabel={t.study.bottomBetter}
          selected={selected}
          disabled={disabled}
          onChoice={onChoice}
        />
      </div>

    </div>
  )
}
