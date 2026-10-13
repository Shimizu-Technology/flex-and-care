import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  ClipboardList,
  FileText,
  HeartHandshake,
  Home,
  LifeBuoy,
  Printer,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { getResources } from '../data/careGuidance'
import { buildCarePlan } from '../lib/buildCarePlan'
import type { CareNeed, CareRecipient, CareUrgency, PlanAnswers } from '../types'
import { ResourceCard } from './ResourceCard'

interface PlanBuilderProps {
  onBack: () => void
  onUrgentHelp: () => void
}

const recipientOptions = [
  { value: 'older-adult' as const, title: 'An older adult', description: 'Usually age 60 or older', icon: Users },
  { value: 'adult-disability' as const, title: 'An adult with a disability', description: 'Support at home or in the community', icon: Accessibility },
  { value: 'young-person' as const, title: 'A child or young person', description: 'Disability or complex support needs', icon: HeartHandshake },
  { value: 'unsure' as const, title: 'I’m not sure', description: 'Help me find a starting point', icon: LifeBuoy },
]

const needOptions = [
  { value: 'respite' as const, title: 'A break or respite', icon: CalendarClock },
  { value: 'daily-care' as const, title: 'Daily care at home', icon: Home },
  { value: 'transportation' as const, title: 'Transportation', icon: Truck },
  { value: 'equipment' as const, title: 'Equipment or supplies', icon: Wrench },
  { value: 'planning' as const, title: 'Benefits or legal planning', icon: FileText },
  { value: 'safety' as const, title: 'I’m worried about safety', icon: ShieldAlert },
]

const urgencyOptions = [
  { value: 'planning' as const, title: 'Planning ahead', description: 'I’m comparing options' },
  { value: 'this-week' as const, title: 'This week', description: 'I need to make progress soon' },
  { value: 'today' as const, title: 'Today', description: 'I need a human starting point now' },
  { value: 'immediate' as const, title: 'Immediate danger', description: 'Someone may not be safe' },
]

export function PlanBuilder({ onBack, onUrgentHelp }: PlanBuilderProps) {
  const [step, setStep] = useState(0)
  const [recipient, setRecipient] = useState<CareRecipient | null>(null)
  const [need, setNeed] = useState<CareNeed | null>(null)
  const [urgency, setUrgency] = useState<CareUrgency | null>(null)
  const [handoffPreviewed, setHandoffPreviewed] = useState(false)

  const completed = step === 3 && recipient && need && urgency
  const answers: PlanAnswers | null = completed ? { recipient, need, urgency } : null
  const plan = answers ? buildCarePlan(answers) : null

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [step])

  function reset() {
    setStep(0)
    setRecipient(null)
    setNeed(null)
    setUrgency(null)
    setHandoffPreviewed(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const canContinue = (step === 0 && recipient) || (step === 1 && need) || (step === 2 && urgency)

  if (plan) {
    const recommendedResources = getResources(plan.resourceIds)
    return (
      <main className="plan-result-shell" id="main-content" tabIndex={-1}>
        <div className="plan-result__topline">
          <button className="back-button" type="button" onClick={onBack}><ArrowLeft size={17} /> Back to questions</button>
          <span><Sparkles size={15} /> Your caregiver support plan</span>
        </div>

        <div className="plan-result-layout">
          <article className="care-plan">
            <div className="care-plan__heading">
              <span>{plan.eyebrow}</span>
              <h1>{plan.title}</h1>
              <p>{plan.summary}</p>
            </div>

            {plan.urgent && (
              <button className="urgent-plan-banner" type="button" onClick={onUrgentHelp}>
                <ShieldAlert size={21} />
                <span><strong>Use a human safety route now</strong>See 911, 988, and Adult Protective Services options</span>
                <ArrowRight size={18} />
              </button>
            )}

            <section className="plan-steps">
              <div className="section-kicker"><span>01</span><h2>Your starting plan</h2></div>
              <ol>
                {plan.steps.map((item, index) => (
                  <li key={item}><span>{index + 1}</span><p>{item}</p></li>
                ))}
              </ol>
            </section>

            <section className="prepare-list">
              <div className="section-kicker"><span>02</span><h2>Helpful to have ready</h2></div>
              <ul>{plan.prepare.map((item) => <li key={item}><Check size={16} /> {item}</li>)}</ul>
            </section>

            <section className="warm-handoff">
              <div>
                <span>Prefer help from a person?</span>
                <h2>Bring a clear plan to the conversation.</h2>
                <p>Print or save this plan and use it during a call with a caregiver-support program. You decide what information to share.</p>
              </div>
              {handoffPreviewed ? (
                <p className="handoff-success" role="status"><Check size={17} /> Your plan is ready. Print or save it, then bring it to your support call.</p>
              ) : (
                <button type="button" onClick={() => setHandoffPreviewed(true)}><HeartHandshake size={18} /> Prepare for a support call</button>
              )}
            </section>

            <div className="plan-actions">
              <button type="button" onClick={() => window.print()}><Printer size={17} /> Print this plan</button>
              <button type="button" onClick={reset}><RotateCcw size={17} /> Start over</button>
            </div>
          </article>

          <aside className="plan-resources" aria-label="Recommended Guam resources">
            <div className="sidebar-heading"><span>Your best starting points</span><h2>Who to contact</h2></div>
            {recommendedResources.map((resource) => <ResourceCard key={resource.id} resource={resource} compact />)}
            <p className="plan-disclaimer">This plan does not determine eligibility or replace professional advice. Confirm current details directly with each organization.</p>
          </aside>
        </div>
      </main>
    )
  }

  return (
    <main className="plan-builder-shell" id="main-content" tabIndex={-1}>
      <button className="back-button" type="button" onClick={onBack}><ArrowLeft size={17} /> Back to ask</button>
      <div className="plan-builder-layout">
        <section className="plan-builder-card">
          <div className="plan-progress" aria-label={`Step ${step + 1} of 3`}>
            <span>Build my plan</span>
            <div>{[0, 1, 2].map((item) => <i key={item} className={item <= step ? 'active' : ''} />)}</div>
            <small>Step {step + 1} of 3</small>
          </div>

          {step === 0 && (
            <fieldset className="plan-question">
              <legend>Who are you supporting?</legend>
              <p>Choose the closest fit. You will not be asked for a diagnosis.</p>
              <div className="plan-option-grid plan-option-grid--two">
                {recipientOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button key={option.value} type="button" className={recipient === option.value ? 'selected' : ''} onClick={() => setRecipient(option.value)} aria-pressed={recipient === option.value}>
                      <Icon size={22} /><span><strong>{option.title}</strong><small>{option.description}</small></span>{recipient === option.value && <Check size={17} />}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset className="plan-question">
              <legend>What feels most important today?</legend>
              <p>One starting point is enough. The plan can include related services afterward.</p>
              <div className="plan-option-grid plan-option-grid--two">
                {needOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button key={option.value} type="button" className={need === option.value ? 'selected' : ''} onClick={() => setNeed(option.value)} aria-pressed={need === option.value}>
                      <Icon size={22} /><span><strong>{option.title}</strong></span>{need === option.value && <Check size={17} />}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="plan-question">
              <legend>How soon do you need help?</legend>
              <p>This changes the order of the next steps—not whether someone deserves help.</p>
              <div className="plan-option-grid">
                {urgencyOptions.map((option) => (
                  <button key={option.value} type="button" className={urgency === option.value ? 'selected' : ''} onClick={() => setUrgency(option.value)} aria-pressed={urgency === option.value}>
                    <span><strong>{option.title}</strong><small>{option.description}</small></span>{urgency === option.value && <Check size={17} />}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="plan-builder-actions">
            <button type="button" className="secondary-button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Back</button>
            <button type="button" className="primary-button" disabled={!canContinue} onClick={() => setStep((current) => Math.min(3, current + 1))}>
              {step === 2 ? 'Create my plan' : 'Continue'} <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <aside className="plan-builder-aside">
          <ClipboardList size={28} />
          <span>About two minutes</span>
          <h2>A small plan is easier to act on than a long directory.</h2>
          <p>This plan uses only three answers. It does not ask for a name, account, diagnosis, or medical record.</p>
          <button type="button" onClick={onUrgentHelp}><ShieldAlert size={17} /> Skip to urgent help</button>
        </aside>
      </div>
    </main>
  )
}
