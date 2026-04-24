'use client'

import Image from 'next/image'
import { useLang } from '@/lib/i18n'

interface ImagePairProps {
  leftSrc: string
  rightSrc: string
  refSrc?: string
}

export default function ImagePair({ leftSrc, rightSrc, refSrc }: ImagePairProps) {
  const { t } = useLang()

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 参考图：顶部全宽 */}
      {refSrc && (
        <div className="flex flex-col items-center w-full">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-0.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {t.img.ref}
          </span>
          <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <Image
              src={refSrc}
              alt={t.img.ref}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* 对比图：左右并排（手机上下堆叠） */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col items-center w-full md:w-1/2">
          <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
            <span className="hidden md:inline">{t.img.left}</span>
            <span className="md:hidden">{t.img.top}</span>
          </span>
          <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <Image
              src={leftSrc}
              alt={t.img.left}
              fill
              className="object-contain"
              priority={!refSrc}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="flex flex-col items-center w-full md:w-1/2">
          <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
            <span className="hidden md:inline">{t.img.right}</span>
            <span className="md:hidden">{t.img.bottom}</span>
          </span>
          <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <Image
              src={rightSrc}
              alt={t.img.right}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
