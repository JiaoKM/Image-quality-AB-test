'use client'

import Image from 'next/image'
import { useLang } from '@/lib/i18n'

interface ImagePairProps {
  leftSrc: string
  rightSrc: string
}

export default function ImagePair({ leftSrc, rightSrc }: ImagePairProps) {
  const { t } = useLang()

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-start">
      <div className="flex flex-col items-center w-full md:w-1/2">
        <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
          {/* 桌面显示左/右，手机显示上/下 */}
          <span className="hidden md:inline">{t.img.left}</span>
          <span className="md:hidden">{t.img.top}</span>
        </span>
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <Image
            src={leftSrc}
            alt={t.img.left}
            fill
            className="object-contain"
            priority
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
  )
}
