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
  label,
  selected,
  disabled,
  onChoice,
}: {
  value: Choice
  label: string
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
      {label}
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
  const colClass = refSrc ? 'w-1/3' : 'w-1/2'

  return (
    <>
      {/* ── 桌面布局：左图 | 参考图 | 右图，按钮各在图片下方 ── */}
      <div className="hidden md:flex gap-3 w-full items-start">
        {/* 左图列 */}
        <div className={`flex flex-col items-center ${colClass}`}>
          <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
            {t.img.left}
          </span>
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src={leftSrc}
              alt={t.img.left}
              width={0}
              height={0}
              sizes={refSrc ? '33vw' : '50vw'}
              className="w-full h-auto"
              priority
            />
          </div>
          <ChoiceBtn value="left" label={t.study.leftBetter} selected={selected} disabled={disabled} onChoice={onChoice} />
        </div>

        {/* 参考图列（居中） */}
        {refSrc && (
          <div className={`flex flex-col items-center ${colClass}`}>
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
                sizes="33vw"
                className="w-full h-auto"
                priority
              />
            </div>
            <ChoiceBtn value="similar" label={t.study.similar} selected={selected} disabled={disabled} onChoice={onChoice} />
          </div>
        )}

        {/* 右图列 */}
        <div className={`flex flex-col items-center ${colClass}`}>
          <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
            {t.img.right}
          </span>
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src={rightSrc}
              alt={t.img.right}
              width={0}
              height={0}
              sizes={refSrc ? '33vw' : '50vw'}
              className="w-full h-auto"
            />
          </div>
          <ChoiceBtn value="right" label={t.study.rightBetter} selected={selected} disabled={disabled} onChoice={onChoice} />
        </div>
      </div>

      {/* ── 移动端布局：参考图 → 上图 → 下图 → 上图更好 → 下图更好 → 无偏好 ── */}
      <div className="flex flex-col gap-3 w-full md:hidden">
        {/* 参考图 */}
        {refSrc && (
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-0.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {t.img.ref}
            </span>
            <div className="w-full rounded-lg overflow-hidden shadow-md">
              <Image src={refSrc} alt={t.img.ref} width={0} height={0} sizes="100vw" className="w-full h-auto" priority />
            </div>
          </div>
        )}

        {/* 上图（左） */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
            {t.img.top}
          </span>
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <Image src={leftSrc} alt={t.img.top} width={0} height={0} sizes="100vw" className="w-full h-auto" priority />
          </div>
        </div>

        {/* 下图（右） */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
            {t.img.bottom}
          </span>
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <Image src={rightSrc} alt={t.img.bottom} width={0} height={0} sizes="100vw" className="w-full h-auto" />
          </div>
        </div>

        {/* 按钮：上图更好 → 下图更好 → 无偏好 */}
        <ChoiceBtn value="left"    label={t.study.topBetter}    selected={selected} disabled={disabled} onChoice={onChoice} />
        <ChoiceBtn value="right"   label={t.study.bottomBetter} selected={selected} disabled={disabled} onChoice={onChoice} />
        <ChoiceBtn value="similar" label={t.study.similar}      selected={selected} disabled={disabled} onChoice={onChoice} />
      </div>
    </>
  )
}
