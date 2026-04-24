import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 px-4">
      <h1 className="text-4xl font-bold text-gray-900">
        图像质量偏好研究
      </h1>
      <p className="text-lg text-gray-600 max-w-prose">
        感谢您参与本次研究。您将看到若干对图像，每次对比两张，请根据整体视觉效果选择更好的一张。
        完成测试大约需要 <strong>5–10 分钟</strong>。
      </p>
      <p className="text-sm text-gray-400">
        您的回答完全匿名，仅用于学术研究目的。
      </p>
      <Link
        href="/instructions"
        className="mt-4 px-10 py-3 bg-blue-600 text-white rounded-lg
                   text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
      >
        开始
      </Link>
    </div>
  )
}
