import { Sample } from '@/lib/sampleLoader'

export interface DisplayPair {
  sample_id: string
  left_image: string
  right_image: string
  left_method: string
  right_method: string
  ref_image?: string
}

export interface SessionState {
  version: number
  participant_id: string
  ordered_pairs: DisplayPair[]
  current_index: number
}

const KEY_SESSION = 'abtest_session'
const SESSION_VERSION = 2

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDisplayPair(sample: Sample): DisplayPair {
  const swapped = Math.random() < 0.5
  return {
    sample_id: sample.sample_id,
    left_image:   swapped ? `/${sample.image_b}` : `/${sample.image_a}`,
    right_image:  swapped ? `/${sample.image_a}` : `/${sample.image_b}`,
    left_method:  swapped ? sample.method_b      : sample.method_a,
    right_method: swapped ? sample.method_a      : sample.method_b,
    ref_image:    sample.image_ref ? `/${sample.image_ref}` : undefined,
  }
}

export function getOrCreateSession(samples: Sample[]): SessionState {
  if (typeof window === 'undefined') {
    throw new Error('getOrCreateSession 只能在客户端调用')
  }

  const raw = localStorage.getItem(KEY_SESSION)
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as SessionState
      if (
        parsed.version === SESSION_VERSION &&
        parsed.participant_id &&
        Array.isArray(parsed.ordered_pairs) &&
        parsed.ordered_pairs.length === samples.length &&
        typeof parsed.current_index === 'number'
      ) {
        return parsed
      }
    } catch {
      // 数据损坏，重新创建
    }
  }

  const ordered_pairs = shuffle(samples.map(buildDisplayPair))
  const session: SessionState = {
    version: SESSION_VERSION,
    participant_id: generateUUID(),
    ordered_pairs,
    current_index: 0,
  }
  localStorage.setItem(KEY_SESSION, JSON.stringify(session))
  return session
}

export function advanceSession(session: SessionState): SessionState {
  const next: SessionState = {
    ...session,
    current_index: session.current_index + 1,
  }
  localStorage.setItem(KEY_SESSION, JSON.stringify(next))
  return next
}

export function clearSession(): void {
  localStorage.removeItem(KEY_SESSION)
}
