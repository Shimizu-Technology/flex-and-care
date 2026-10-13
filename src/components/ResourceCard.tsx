import { ArrowUpRight, BadgeCheck, ChevronDown, Clock3, FileCheck2, Phone } from 'lucide-react'
import type { Resource } from '../types'

interface ResourceCardProps {
  resource: Resource
  compact?: boolean
}

export function ResourceCard({ resource, compact = false }: ResourceCardProps) {
  return (
    <article className={`resource-card ${compact ? 'resource-card--compact' : ''}`}>
      <div className="resource-card__topline">
        <span className="resource-card__category">{resource.category}</span>
        {resource.verified && (
          <span className="verified-label">
            <BadgeCheck size={14} /> Reference link
          </span>
        )}
      </div>
      <h3>{resource.name}</h3>
      <p>{resource.description}</p>
      {!compact && resource.services && (
        <ul className="resource-card__services" aria-label="Services">
          {resource.services.slice(0, 3).map((service) => <li key={service}>{service}</li>)}
        </ul>
      )}
      {(resource.phone || resource.hours) && (
        <div className="resource-card__details">
          {resource.phone && (
            <span>
              <Phone size={15} /> {resource.phone}
            </span>
          )}
          {resource.hours && (
            <span>
              <Clock3 size={15} /> {resource.hours}
            </span>
          )}
        </div>
      )}
      {!compact && (resource.eligibility || resource.prepare) && (
        <details className="resource-details">
          <summary>
            <FileCheck2 size={16} /> Eligibility and what to prepare <ChevronDown size={15} />
          </summary>
          <div>
            {resource.eligibility && <p><strong>Who it may help</strong>{resource.eligibility}</p>}
            {resource.prepare && (
              <section>
                <strong>Helpful to have ready</strong>
                <ul>{resource.prepare.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            )}
            {resource.availabilityNote && <small>{resource.availabilityNote}</small>}
          </div>
        </details>
      )}
      <a className="text-link" href={resource.url} target={resource.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {resource.actionLabel} <ArrowUpRight size={16} />
      </a>
    </article>
  )
}
