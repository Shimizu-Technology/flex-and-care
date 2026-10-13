import { BookOpenCheck, Check, ChevronRight, CircleDotDashed, Clock3, FileSearch, Users } from 'lucide-react'
import { useState } from 'react'
import { reviewRecords } from '../data/careGuidance'

const statusIcon = {
  Published: Check,
  'Needs review': Clock3,
  Draft: CircleDotDashed,
}

export function ReviewView() {
  const [selected, setSelected] = useState(reviewRecords[0].id)
  const activeRecord = reviewRecords.find((record) => record.id === selected) ?? reviewRecords[0]
  const StatusIcon = statusIcon[activeRecord.status]
  const isPublished = activeRecord.status === 'Published'

  return (
    <main className="review-shell" id="main-content" tabIndex={-1}>
      <section className="page-heading page-heading--review">
        <div>
          <span><BookOpenCheck size={16} /> Flex and Care content workspace</span>
          <h1>Keep every answer current, sourced, and accountable.</h1>
          <p>This public mockup shows a possible review process. It cannot edit or publish content, and the proposed owners have not approved these samples.</p>
        </div>
        <div className="review-metric">
          <strong>{reviewRecords.length}</strong>
          <span>content records</span>
        </div>
      </section>

      <section className="review-workspace">
        <div className="review-list">
          <div className="review-list__heading">
            <span>Content queue</span>
            <small>Updated Aug 17</small>
          </div>
          {reviewRecords.map((record) => {
            const Icon = statusIcon[record.status]
            return (
              <button key={record.id} type="button" className={record.id === selected ? 'active' : ''} onClick={() => setSelected(record.id)}>
                <span className={`status-dot status-dot--${record.status.toLowerCase().replaceAll(' ', '-').replace('for-', '')}`}>
                  <Icon size={15} />
                </span>
                <span>
                  <strong>{record.title}</strong>
                  <small>{record.category}</small>
                </span>
                <ChevronRight size={17} />
              </button>
            )
          })}
        </div>

        <article className="review-detail">
          <div className="review-detail__header">
            <div>
              <span>{activeRecord.category}</span>
              <h2>{activeRecord.title}</h2>
            </div>
            <span className={`review-status review-status--${activeRecord.status.toLowerCase().replaceAll(' ', '-').replace('for-', '')}`}>
              <StatusIcon size={15} /> {activeRecord.status}
            </span>
          </div>

          <div className="review-detail__meta">
            <div><Users size={18} /><span><small>Proposed content owner</small><strong>{activeRecord.owner}</strong></span></div>
            <div><Clock3 size={18} /><span><small>Sample record date</small><strong>{activeRecord.lastReviewed}</strong></span></div>
            <div><FileSearch size={18} /><span><small>Source records</small><strong>{activeRecord.sourceCount} linked</strong></span></div>
          </div>

          <div className="content-checks">
            <h3>{isPublished ? 'Publication checks' : 'Before this answer is published'}</h3>
            <ul>
              <li className="complete"><Check size={16} /><span><strong>Plain-language edit</strong>Readable under stress and on a small screen</span></li>
              <li className="complete"><Check size={16} /><span><strong>Source link attached</strong>Readers can open the responsible organization</span></li>
              <li className={isPublished ? 'complete' : undefined}>
                {isPublished ? <Check size={16} /> : <Clock3 size={16} />}
                <span><strong>Partner accuracy review</strong>{isPublished ? 'Example of completed partner review' : 'Confirm wording, service details, and escalation path'}</span>
              </li>
              <li className={isPublished ? 'complete' : undefined}>
                {isPublished ? <Check size={16} /> : <Clock3 size={16} />}
                <span><strong>Next review date</strong>{isPublished ? 'Example of an owner and review reminder' : 'Set an owner and reminder before publishing'}</span>
              </li>
            </ul>
          </div>

          <div className="concept-callout">
            <strong>Publishing rule</strong>
            <p>Guidance can be published only after it has a responsible owner, source links, an accuracy review, and a next review date.</p>
          </div>
        </article>
      </section>
    </main>
  )
}
