import Image from 'next/image'

interface ImagePairProps {
  leftSrc: string
  rightSrc: string
  altLeft?: string
  altRight?: string
}

export default function ImagePair({
  leftSrc,
  rightSrc,
  altLeft = '左侧图片',
  altRight = '右侧图片',
}: ImagePairProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-start">
      <div className="flex flex-col items-center w-full md:w-1/2">
        <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
          左图
        </span>
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <Image
            src={leftSrc}
            alt={altLeft}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full md:w-1/2">
        <span className="text-sm font-semibold text-gray-500 mb-2 tracking-wide uppercase">
          右图
        </span>
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <Image
            src={rightSrc}
            alt={altRight}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}
