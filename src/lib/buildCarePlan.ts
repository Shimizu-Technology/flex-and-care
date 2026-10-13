import type { CareNeed, CarePlan, CareRecipient, CareUrgency, PlanAnswers } from '../types'

const recipientLabels: Record<CareRecipient, string> = {
  'older-adult': 'an older adult',
  'adult-disability': 'an adult with a disability',
  'young-person': 'a child or young person with a disability',
  unsure: 'someone who needs support',
}

const urgencyOpeners: Record<CareUrgency, string> = {
  planning: 'You are planning ahead, which gives you time to compare options and gather the right documents.',
  'this-week': 'You need movement this week, so the plan starts with one primary call and a backup route.',
  today: 'You need help today. Start with a direct human contact and explain the most urgent barrier first.',
  immediate: 'Safety comes first. Use an urgent service now rather than waiting for a program intake.',
}

const plans: Record<CareNeed, Omit<CarePlan, 'summary' | 'urgent'>> = {
  respite: {
    eyebrow: 'A break and backup care',
    title: 'Start with a caregiver-support intake, then ask about the type of respite that fits your situation.',
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
    title: 'Begin with a needs conversation, then connect daily tasks to the right local program.',
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
    title: 'Check paratransit eligibility and schedule needs before the next important appointment.',
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
    title: 'Match the immediate need with loan, assistance, and supply options before purchasing on your own.',
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
    title: 'Separate the benefits, legal, and disability questions so each one reaches the right specialist.',
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
    title: 'Use the safest human route first. You do not need to solve a crisis alone.',
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
  const base = plans[answers.need]
  const urgent = answers.urgency === 'immediate' || answers.need === 'safety'
  return {
    ...base,
    summary: `${urgencyOpeners[answers.urgency]} This starting plan is tailored for someone supporting ${recipientLabels[answers.recipient]}.`,
    urgent,
  }
}
