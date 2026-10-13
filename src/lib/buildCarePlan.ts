import type { CareNeed, CarePlan, CareRecipient, CareUrgency, PlanAnswers } from '../types'

const recipientLabels: Record<CareRecipient, string> = {
  'older-adult': 'an older adult',
  'adult-disability': 'an adult with a disability',
  dementia: 'someone with dementia or Alzheimer’s',
  unsure: 'someone who needs support',
}

const urgencyOpeners: Record<CareUrgency, string> = {
  planning: 'You are planning ahead, which gives you time to compare options and gather the right documents.',
  'this-week': 'You need movement this week, so the plan starts with one primary call and a backup route.',
  today: 'You need help today. Start with a direct human contact and explain the most urgent barrier first.',
  immediate: 'Safety comes first. Use an urgent service now rather than waiting for a program intake.',
}

const plans: Record<CareNeed, Omit<CarePlan, 'summary' | 'urgent'>> = {
  'new-diagnosis': {
    eyebrow: 'After a dementia diagnosis',
    title: 'Find your first next steps.',
    steps: [
      'Ask the diagnosing clinician for a written explanation, follow-up plan, and a contact for questions.',
      'Write down the daily tasks and questions your family needs help with. Bring this list to the next appointment.',
      'Contact caregiver support to ask about information, training, and local services. Confirm which services fit your situation.',
    ],
    prepare: ['Questions for the clinician', 'The follow-up appointment or contact', 'Daily support needs', 'Who can help in the family'],
    resourceIds: ['hsp-caregiver', 'dphss-aging'],
  },
  respite: {
    eyebrow: 'A break and backup care',
    title: 'Find a break and backup care.',
    steps: [
      'Describe when you need relief, for how long, and whether care should happen at home or in another setting.',
      'Ask the National Family Caregiver Support Program about current respite eligibility, availability, and wait times.',
      'If the person is 60 or older, also ask DPHSS Aging Services about adult day care, in-home help, and case management.',
    ],
    prepare: ['The care recipient’s age', 'A short description of daily support needs', 'The days or times you need relief', 'Insurance or benefit information, if available'],
    resourceIds: ['hsp-caregiver', 'dphss-aging'],
  },
  'daily-care': {
    eyebrow: 'Support at home',
    title: 'Find help with daily care.',
    steps: [
      'List the daily activities that are becoming difficult, such as bathing, meals, housekeeping, supervision, or medication routines.',
      'Contact DPHSS Aging Services for case management, in-home services, meals, adult day care, or transportation if the person may qualify.',
      'Ask caregiver support about training, counseling, and supplemental help for the family member providing care.',
    ],
    prepare: ['The care recipient’s age and living situation', 'Tasks they can and cannot do safely', 'Current helpers and schedule', 'Any mobility or communication needs'],
    resourceIds: ['dphss-aging', 'hsp-caregiver'],
  },
  transportation: {
    eyebrow: 'Getting to care and services',
    title: 'Plan transportation to care.',
    steps: [
      'Write down the recurring destinations, appointment times, mobility equipment, and whether someone must travel with the rider.',
      'Review GRTA’s ADA paratransit application and ask which eligibility category fits the person’s functional needs.',
      'If the rider is 60 or older, ask DPHSS whether senior transportation is another available route.',
    ],
    prepare: ['Travel destinations and frequency', 'Mobility or cognitive barriers to fixed-route transit', 'Provider documentation, if requested', 'A backup contact for scheduling'],
    resourceIds: ['grta', 'dphss-aging'],
  },
  equipment: {
    eyebrow: 'Equipment and supplies',
    title: 'Find equipment and supply contacts.',
    steps: [
      'Write down the exact item, size, and how it will be used at home, school, work, or in the community.',
      'Check GSAT’s equipment catalog for a demonstration or free short-term device loan.',
      'Ask caregiver support or DISID whether supplemental supplies or other assistance may be available.',
    ],
    prepare: ['Exact item or function needed', 'Size and accessibility requirements', 'How long the item is needed', 'Photo ID or supporting documentation if a program requests it'],
    resourceIds: ['gsat', 'disid', 'hsp-caregiver'],
  },
  planning: {
    eyebrow: 'Benefits and future planning',
    title: 'Prepare for benefits and future decisions.',
    steps: [
      'List the decisions you need help with: Medicare, disability services, savings, powers of attorney, advance directives, or guardianship.',
      'Use DPHSS Medicare Assistance or DISID as the first benefits-navigation route.',
      'For legal planning involving someone age 60 or older, contact the Guam Elder Justice Center and ask which documents or alternatives apply.',
    ],
    prepare: ['Government-issued identification', 'Current insurance or benefit letters', 'A list of legal or financial decisions', 'Existing powers of attorney or directives, if any'],
    resourceIds: ['dphss-aging', 'elder-justice', 'disid'],
  },
  safety: {
    eyebrow: 'Safety and protection',
    title: 'Get human help first.',
    steps: [
      'Call 911 if anyone is in immediate danger, severely injured, missing, or unable to breathe.',
      'Call or text 988 for a mental-health or emotional crisis.',
      'Contact Adult Protective Services for suspected abuse, neglect, exploitation, abandonment, or self-neglect involving a vulnerable adult.',
    ],
    prepare: ['Your current location', 'What happened and when', 'Immediate medical or safety concerns', 'A safe callback number, if it is safe to provide one'],
    resourceIds: ['emergency', 'gbhwc-988', 'aps'],
  },
}

export function buildCarePlan(answers: PlanAnswers): CarePlan {
  const urgent = answers.urgency === 'immediate' || answers.need === 'safety'
  const base = plans[urgent ? 'safety' : answers.need]
  return {
    ...base,
    summary: `${urgencyOpeners[answers.urgency]} These sample starting steps are for a caregiver supporting ${recipientLabels[answers.recipient]}.`,
    urgent,
  }
}
