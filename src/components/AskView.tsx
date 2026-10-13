import { ArrowRight, CheckCircle2, ClipboardList, MessageCircleQuestion, Search, ShieldCheck, Sparkles } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { guidance, valueCards } from '../data/careGuidance'

interface AskViewProps {
  onAsk: (question: string) => void
  onBuildPlan: () => void
  isLoading: boolean
}

export function AskView({ onAsk, onBuildPlan, isLoading }: AskViewProps) {
  const [question, setQuestion] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (question.trim()) onAsk(question)
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero">
        <div className="hero__orb hero__orb--one" aria-hidden="true" />
        <div className="hero__orb hero__orb--two" aria-hidden="true" />
        <div className="hero__content">
          <div className="concept-label">
            <Sparkles size={15} /> Guam caregiver guidance
          </div>
          <h1>Caregiving is hard.<br /><em>Finding help shouldn’t be.</em></h1>
          <p className="hero__lede">Ask a real question. Get a clear next step, a local resource, and the source behind the guidance.</p>

          <form className="ask-box" onSubmit={handleSubmit}>
            <label htmlFor="care-question">What do you need help with today?</label>
            <div className="ask-box__field">
              <MessageCircleQuestion size={23} aria-hidden="true" />
              <input
                id="care-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Try: How can I find respite care?"
                autoComplete="off"
              />
              <button type="submit" disabled={!question.trim() || isLoading}>
                {isLoading ? <span className="loading-dot" aria-label="Finding guidance" /> : <Search size={19} />}
                <span>{isLoading ? 'Checking…' : 'Find guidance'}</span>
              </button>
            </div>
          </form>

          <button className="guided-entry" type="button" onClick={onBuildPlan}>
            <ClipboardList size={20} />
            <span><strong>Not sure what to ask?</strong> Build a simple caregiver plan</span>
            <small>About 2 minutes</small>
            <ArrowRight size={17} />
          </button>

          <div className="suggested-questions" aria-label="Suggested questions">
            <span>Common caregiver questions</span>
            <div>
              {guidance.map((item) => (
                <button key={item.id} type="button" onClick={() => onAsk(item.question)} disabled={isLoading}>
                  {item.question} <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="trust-card">
          <span className="trust-card__number">01</span>
          <ShieldCheck size={30} />
          <h2>Clear guidance, backed by sources</h2>
          <p>Answers are built from information that can be reviewed and kept current.</p>
          <ul>
            <li><CheckCircle2 size={17} /> Clear, practical steps</li>
            <li><CheckCircle2 size={17} /> Local resource handoffs</li>
            <li><CheckCircle2 size={17} /> Sources you can open</li>
          </ul>
        </aside>
      </section>

      <section className="promise-section" aria-labelledby="promise-heading">
        <div className="section-intro">
          <span>A calmer starting point</span>
          <h2 id="promise-heading">Built around the moment a caregiver says, “Where do I even begin?”</h2>
          <p>Start with clear guidance and local resources. Reach a person when you need more help.</p>
        </div>
        <div className="value-grid">
          {valueCards.map((card, index) => {
            const Icon = card.icon
            return (
              <article key={card.title}>
                <span className="value-grid__index">0{index + 1}</span>
                <Icon size={24} />
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
