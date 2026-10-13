import { ArrowLeft, BadgeCheck, CircleAlert, ExternalLink, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { getResources } from '../data/careGuidance'
import type { Guidance } from '../types'
import { ResourceCard } from './ResourceCard'

interface AnswerViewProps {
  answer: Guidance
  onBack: () => void
}

export function AnswerView({ answer, onBack }: AnswerViewProps) {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null)
  const linkedResources = getResources(answer.resourceIds)

  return (
    <main className="answer-shell" id="main-content" tabIndex={-1}>
      <button type="button" className="back-button" onClick={onBack}>
        <ArrowLeft size={17} /> Ask another question
      </button>

      <div className="answer-layout">
        <article className="answer-card">
          <div className="answer-card__heading">
            <span className="answer-card__eyebrow">{answer.eyebrow}</span>
            <span className="answer-card__status">
              <BadgeCheck size={15} /> Sample guidance
            </span>
          </div>
          <p className="answer-card__question">“{answer.question}”</p>
          <h1>{answer.title}</h1>
          <p className="answer-card__summary">{answer.summary}</p>

          <section className="pathway" aria-labelledby="next-steps-heading">
            <div className="section-kicker">
              <span>01</span>
              <h2 id="next-steps-heading">What you can do now</h2>
            </div>
            <ol>
              {answer.immediateSteps.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="source-panel" aria-labelledby="sources-heading">
            <div className="section-kicker section-kicker--light">
              <span>02</span>
              <h2 id="sources-heading">Reference links</h2>
            </div>
            <p>These sources informed the sample. A designated partner still needs to approve the wording before public use.</p>
            <div className="source-list">
              {answer.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  <span>
                    <strong>{source.organization}</strong>
                    {source.label}
                  </span>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
            <div className="review-stamp">
              <BadgeCheck size={17} />
              <span>
                <strong>Awaiting partner review</strong>
                Reference collection: {answer.reviewDate}
              </span>
            </div>
          </section>

          <div className="concept-callout"><strong>Sample content</strong><p>{answer.note ?? "Final wording and local service details need partner approval."}</p></div>
          <div className="feedback-block">
            {feedback ? (
              <p role="status">Feedback selected for this preview. It is not saved or sent.</p>
            ) : (
              <>
                <span>Did this point you in the right direction?</span>
                <div>
                  <button type="button" onClick={() => setFeedback('yes')}>
                    <ThumbsUp size={16} /> Yes
                  </button>
                  <button type="button" onClick={() => setFeedback('no')}>
                    <ThumbsDown size={16} /> Not yet
                  </button>
                </div>
              </>
            )}
          </div>
        </article>

        <aside className="answer-sidebar" aria-label="Local resources">
          <div className="sidebar-heading">
            <span>Local routes to help</span>
            <h2>Start here on Guam</h2>
          </div>
          {linkedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} compact />
          ))}
          <div className="safety-note">
            <CircleAlert size={19} />
            <p><strong>Not medical advice.</strong> For sudden, severe, or dangerous symptoms, contact a qualified professional or emergency services.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
