import { ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react'
import type { Guidance } from '../types'

interface Props {
  question: string
  matches: Guidance[]
  urgent: boolean
  onChoose: (answer: Guidance) => void
  onBack: () => void
  onUrgentHelp: () => void
  onResources: () => void
}

export function GuidanceSearchView({ question, matches, urgent, onChoose, onBack, onUrgentHelp, onResources }: Props) {
  return (
    <main className="search-results-shell" id="main-content" tabIndex={-1}>
      <button className="back-button" type="button" onClick={onBack}><ArrowLeft size={17} /> Change my search</button>
      <section className="search-results-card">
        <span className="concept-label">Sample caregiver library</span>
        <h1>{urgent ? 'Get human help first.' : 'Choose a topic to read.'}</h1>
        <p className="search-query">Your search: “{question}”</p>
        <button className="urgent-plan-banner" type="button" onClick={onUrgentHelp}>
          <ShieldAlert size={21} /><span><strong>{urgent ? 'This could need urgent help' : 'Is someone in danger or do you need urgent help?'}</strong>Open human-help contacts. This search cannot assess safety.</span><ArrowRight size={18} />
        </button>
        {urgent ? <p>Use a human-help route now. We won’t select a caregiving article for this search.</p> : (
          <>
            <p>These are possible topic matches, not an answer to your situation. Sample wording is awaiting partner review.</p>
            {matches.length ? <div className="topic-matches">{matches.map((answer) => (
              <button type="button" key={answer.id} onClick={() => onChoose(answer)}><span><strong>{answer.question}</strong><small>{answer.eyebrow} · Sample guidance</small></span><ArrowRight size={18} /></button>
            ))}</div> : <p role="status">No sample topics match that search. Try another phrase or browse local resources. Your search is not stored.</p>}
            <button className="secondary-button" type="button" onClick={onResources}>Browse local resources</button>
          </>
        )}
      </section>
    </main>
  )
}
