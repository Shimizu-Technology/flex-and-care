import { Search, ShieldCheck, Waypoints } from 'lucide-react'
import { useMemo, useState } from 'react'
import { resources } from '../data/careGuidance'
import type { ResourceTopic } from '../types'
import { ResourceCard } from './ResourceCard'

const filters: Array<'All' | ResourceTopic> = ['All', 'Breaks & care', 'Daily needs', 'Equipment', 'Benefits & planning', 'Transportation', 'Urgent help']

export function ResourcesView() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [query, setQuery] = useState('')

  const visibleResources = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return resources.filter((resource) => {
      const matchesFilter = filter === 'All' || resource.topics.includes(filter)
      const matchesQuery = !normalized || `${resource.name} ${resource.description} ${resource.category}`.toLowerCase().includes(normalized)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <main className="directory-shell" id="main-content" tabIndex={-1}>
      <section className="page-heading">
        <div>
          <span><Waypoints size={16} /> Guam resource directory</span>
          <h1>Find the right door to knock on.</h1>
          <p>Start with what you need—not an agency name. Open details only when you are ready to take the next step.</p>
        </div>
        <div className="source-promise">
          <ShieldCheck size={22} />
          <span><strong>Official source links</strong>Open the organization responsible for each service.</span>
        </div>
      </section>

      <section className="directory-tools" aria-label="Resource filters">
        <label className="directory-search">
          <Search size={18} />
          <span className="sr-only">Search resources</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search programs or support" />
        </label>
        <div className="filter-row">
          {filters.map((item) => (
            <button key={item} type="button" className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <div className="directory-count" aria-live="polite"><strong>{visibleResources.length}</strong> local starting points</div>
      <section className="resource-grid">
        {visibleResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
        {visibleResources.length === 0 && <p className="empty-state">No resources match that search.</p>}
      </section>
      <p className="directory-disclaimer">Program details can change. Confirm availability, eligibility, hours, and contact information directly with the organization.</p>
    </main>
  )
}
