import Link from 'next/link'

export default function InstructionsPage() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 py-8 px-4">
      <h2 className="text-3xl font-bold text-gray-900">实验说明</h2>

      <ol className="list-decimal list-inside space-y-4 text-gray-700 text-base">
        <li>
          每次您将看到<strong>两张图片</strong>并排显示（在手机上为上下排列）。
        </li>
        <li>
          请综合比较两张图片的整体视觉质量，包括清晰度、细节、真实感和是否有明显的瑕疵。
        </li>
        <li>
          根据您的判断，点击 <strong>「左图更好」</strong>、<strong>「右图更好」</strong>
          或 <strong>「差不多 / 无偏好」</strong>。
        </li>
        <li>
          没有标准答案，请依据您的第一印象作出选择即可。
        </li>
        <li>
          点击按钮后<strong>无法修改</strong>，请稍作思考后再点击。
        </li>
        <li>
          请不要刷新页面或使用浏览器的"后退"按钮。
        </li>
      </ol>

      <p className="text-gray-500 text-sm bg-gray-100 rounded-lg px-4 py-3">
        💡 如需中途休息，可以直接关闭浏览器，下次打开时进度会自动恢复。
      </p>

      <Link
        href="/study"
        className="self-start px-10 py-3 bg-green-600 text-white rounded-lg
                   font-semibold hover:bg-green-700 transition-colors shadow-md"
      >
        开始实验
      </Link>
    </div>
  )
}
