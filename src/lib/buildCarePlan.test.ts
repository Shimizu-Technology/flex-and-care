import { describe, expect, it } from 'vitest'
import { buildCarePlan } from './buildCarePlan'

describe('buildCarePlan', () => {
  it('builds a focused respite plan', () => {
    const plan = buildCarePlan({ recipient: 'older-adult', need: 'respite', urgency: 'this-week' })
    expect(plan.resourceIds).toEqual(['hsp-caregiver', 'dphss-aging'])
    expect(plan.title).toContain('caregiver-support intake')
    expect(plan.urgent).toBe(false)
  })

  it('routes safety needs to urgent services', () => {
    const plan = buildCarePlan({ recipient: 'adult-disability', need: 'safety', urgency: 'today' })
    expect(plan.resourceIds).toEqual(['emergency', 'gbhwc-988', 'aps'])
    expect(plan.urgent).toBe(true)
  })

  it('treats immediate urgency as urgent for every need', () => {
    const plan = buildCarePlan({ recipient: 'young-person', need: 'transportation', urgency: 'immediate' })
    expect(plan.urgent).toBe(true)
  })
})
