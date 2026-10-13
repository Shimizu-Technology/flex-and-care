import type { LucideIcon } from 'lucide-react'

export type View = 'ask' | 'plan' | 'resources' | 'review'

export type ResourceCategory =
  | 'Government'
  | 'Caregiver support'
  | 'Assistive technology'
  | 'Transportation'
  | 'Legal & planning'
  | 'Urgent help'

export type ResourceTopic = 'Breaks & care' | 'Daily needs' | 'Equipment' | 'Benefits & planning' | 'Transportation' | 'Urgent help'

export interface Resource {
  id: string
  name: string
  shortName: string
  description: string
  category: ResourceCategory
  topics: ResourceTopic[]
  phone?: string
  hours?: string
  url: string
  actionLabel: string
  verified: boolean
  eligibility?: string
  prepare?: string[]
  services?: string[]
  availabilityNote?: string
}

export interface Source {
  label: string
  organization: string
  url: string
}

export interface Guidance {
  id: string
  question: string
  promptLabel: string
  keywords: string[]
  eyebrow: string
  title: string
  summary: string
  immediateSteps: string[]
  resourceIds: string[]
  sources: Source[]
  reviewedBy: string
  reviewDate: string
  note?: string
}

export interface ReviewRecord {
  id: string
  title: string
  category: string
  owner: string
  status: 'Published' | 'Needs review' | 'Draft'
  lastReviewed: string
  sourceCount: number
}

export interface ValueCard {
  title: string
  copy: string
  icon: LucideIcon
}

export type CareRecipient = 'older-adult' | 'adult-disability' | 'young-person' | 'unsure'
export type CareNeed = 'respite' | 'daily-care' | 'transportation' | 'equipment' | 'planning' | 'safety'
export type CareUrgency = 'planning' | 'this-week' | 'today' | 'immediate'

export interface PlanAnswers {
  recipient: CareRecipient
  need: CareNeed
  urgency: CareUrgency
}

export interface CarePlan {
  eyebrow: string
  title: string
  summary: string
  steps: string[]
  prepare: string[]
  resourceIds: string[]
  urgent: boolean
}
