interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round(((current - 1) / total) * 100)

  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>第 {current} 题 / 共 {total} 题</span>
        <span>{pct}% 已完成</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
