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
  const colClass = refSrc ? 'w-full md:w-1/3' : 'w-full md:w-1/2'

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full items-start">
      {/* 参考图 */}
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
        </div>
      )}

      {/* 左图 */}
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
            priority={!refSrc}
          />
        </div>
      </div>

      {/* 右图 */}
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
      </div>
    </div>
  )
}
