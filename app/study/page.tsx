'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ImagePair from '@/components/ImagePair'
import ChoiceButtons from '@/components/ChoiceButtons'
import ProgressBar from '@/components/ProgressBar'
import { getAllSamples } from '@/lib/sampleLoader'
import { getOrCreateSession, advanceSession, SessionState } from '@/lib/randomize'
import { getSupabase } from '@/lib/supabase'
import { useLang } from '@/lib/i18n'

type Choice = 'left' | 'right' | 'similar'

export default function StudyPage() {
  const router = useRouter()
  const { t } = useLang()
  const [session, setSession] = useState<SessionState | null>(null)
  const [selected, setSelected] = useState<Choice | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const questionStartTime = useRef<number>(Date.now())

  useEffect(() => {
    const samples = getAllSamples()
    const s = getOrCreateSession(samples)
    if (s.current_index >= s.ordered_pairs.length) {
      router.replace('/done')
      return
    }
    setSession(s)
    questionStartTime.current = Date.now()
  }, [router])

  useEffect(() => {
    if (!session) return
    const nextIndex = session.current_index + 1
    if (nextIndex >= session.ordered_pairs.length) return
    const nextPair = session.ordered_pairs[nextIndex]
    ;[nextPair.left_image, nextPair.right_image].forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [session])

  const handleChoice = useCallback(
    async (choice: Choice) => {
      if (!session || selected !== null || submitting) return

      const responseTimeMs = Date.now() - questionStartTime.current
      const pair = session.ordered_pairs[session.current_index]

      setSelected(choice)
      setSubmitting(true)
      setError(null)

      const { error: dbError } = await getSupabase().from('responses').insert({
        participant_id:   session.participant_id,
        sample_id:        pair.sample_id,
        left_method:      pair.left_method,
        right_method:     pair.right_method,
        choice,
        response_time_ms: responseTimeMs,
      })

      if (dbError) {
        console.error('Supabase error:', dbError)
        setError(t.study.error)
        setSelected(null)
        setSubmitting(false)
        return
      }

      const nextSession = advanceSession(session)
      setSubmitting(false)

      if (nextSession.current_index >= nextSession.ordered_pairs.length) {
        router.push('/done')
      } else {
        setSession(nextSession)
        setSelected(null)
        questionStartTime.current = Date.now()
      }
    },
    [session, selected, submitting, router, t]
  )

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 animate-pulse text-lg">{t.study.loading}</p>
      </div>
    )
  }

  const currentPair = session.ordered_pairs[session.current_index]
  const total = session.ordered_pairs.length
  const displayIndex = session.current_index + 1

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar current={displayIndex} total={total} />

      <h2 className="text-center text-xl font-semibold text-gray-700">
        {t.study.question}
      </h2>

      <ImagePair
        leftSrc={currentPair.left_image}
        rightSrc={currentPair.right_image}
      />

      {error && (
        <p className="text-center text-red-500 text-sm font-medium">{error}</p>
      )}

      <ChoiceButtons
        onChoice={handleChoice}
        disabled={selected !== null || submitting}
        selected={selected}
      />

      {submitting && (
        <p className="text-center text-gray-400 text-sm animate-pulse">
          {t.study.saving}
        </p>
      )}
    </div>
  )
}
