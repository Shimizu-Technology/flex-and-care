import { ArrowLeft, CircleHelp, PhoneCall, Waypoints } from 'lucide-react'

interface FallbackViewProps {
  question: string
  onBack: () => void
  onResources: () => void
}

export function FallbackView({ question, onBack, onResources }: FallbackViewProps) {
  return (
    <main className="fallback-shell" id="main-content" tabIndex={-1}>
      <section className="fallback-card">
        <div className="fallback-card__icon"><CircleHelp size={34} /></div>
        <span className="answer-card__eyebrow">No reviewed answer yet</span>
        <p className="fallback-card__question">“{question}”</p>
        <h1>I don’t have a trusted answer for that yet.</h1>
        <p>That is safer than guessing. Your question is not stored. You can browse local resources or try asking in a different way.</p>
        <div className="fallback-actions">
          <button className="primary-button" type="button" onClick={onResources}>
            <Waypoints size={18} /> Browse local resources
          </button>
          <button className="secondary-button" type="button" onClick={onBack}>
            <ArrowLeft size={18} /> Try another question
          </button>
        </div>
        <div className="urgent-strip">
          <PhoneCall size={19} />
          <span><strong>Is someone in immediate danger?</strong> Call 911 or seek urgent professional help.</span>
        </div>
      </section>
    </main>
  )
}
