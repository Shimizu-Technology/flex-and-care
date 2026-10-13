import { describe, expect, it } from 'vitest'
import { hasExplicitDanger, normalizeQuestion, searchGuidance } from './matchGuidance'

describe('caregiver article search', () => {
  it('normalizes punctuation and whitespace', () => {
    expect(normalizeQuestion('  Respite, care? ')).toBe('respite care')
  })
  it('returns topics for the user to choose', () => {
    expect(searchGuidance('Where can I find adult diapers on Guam?').map((item) => item.id)).toContain('supplies')
  })
  it('does not match rest inside arrest', () => {
    expect(searchGuidance('My father is in cardiac arrest')).toEqual([])
  })
  it.each(['My dad with dementia cannot breathe', 'My father is in cardiac arrest', "He can’t breathe", 'My mother is missing', 'My dad with dementia is unable to breathe', 'My dad is unresponsive'])('recognizes explicit danger: %s', (question) => {
    expect(hasExplicitDanger(question)).toBe(true)
  })
  it('returns an empty list for unsupported topics', () => {
    expect(searchGuidance('Can you complete my tax return?')).toEqual([])
  })
})
