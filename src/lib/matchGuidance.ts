import { guidance } from '../data/careGuidance'

export function normalizeQuestion(question: string) {
  return question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

export function searchGuidance(question: string) {
  const normalized = normalizeQuestion(question)
  if (!normalized) return []
  const padded = ` ${normalized} `
  return guidance
    .map((item) => ({
      item,
      score: item.keywords.reduce((total, keyword) => total + (padded.includes(` ${normalizeQuestion(keyword)} `) ? keyword.split(' ').length : 0), 0),
    }))
    .filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).map(({ item }) => item)
}

// A few explicit danger phrases; absence of a match never means safe.
export function hasExplicitDanger(question: string) {
  return /\b(cannot breathe|can t breathe|unable to breathe|not breathing|difficulty breathing|trouble breathing|struggling to breathe|cardiac arrest|unconscious|unresponsive|immediate danger|severe bleeding|is missing|has gone missing|kill myself|kill himself|kill herself|suicide)\b/.test(normalizeQuestion(question))
}
