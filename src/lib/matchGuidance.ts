import { guidance } from '../data/careGuidance'
import type { Guidance } from '../types'

export function normalizeQuestion(question: string) {
  return question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

export function matchGuidance(question: string): Guidance | null {
  const normalized = normalizeQuestion(question)
  if (!normalized) return null

  const exact = guidance.find((item) => normalizeQuestion(item.question) === normalized)
  if (exact) return exact

  const ranked = guidance
    .map((item) => ({
      item,
      score: item.keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? keyword.split(' ').length : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)

  return ranked[0]?.score > 0 ? ranked[0].item : null
}
