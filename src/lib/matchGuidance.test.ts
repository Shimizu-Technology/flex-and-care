import { describe, expect, it } from 'vitest'
import { matchGuidance, normalizeQuestion } from './matchGuidance'

describe('matchGuidance', () => {
  it('normalizes punctuation and whitespace', () => {
    expect(normalizeQuestion('  Respite, care? ')).toBe('respite care')
  })

  it('matches a known question exactly', () => {
    expect(matchGuidance('Where can I find adult diapers on Guam?')?.id).toBe('supplies')
  })

  it('matches plain-language keywords', () => {
    expect(matchGuidance('My dad gets agitated every evening')?.id).toBe('late-day-agitation')
  })

  it('returns null when no approved guidance exists', () => {
    expect(matchGuidance('Can you complete my tax return?')).toBeNull()
  })
})
