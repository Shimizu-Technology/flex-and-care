import { BookOpenCheck, ExternalLink, Search, ShieldAlert, Waypoints } from 'lucide-react'
import type { View } from '../types'
import { BrandMark } from './BrandMark'

interface HeaderProps {
  view: View
  onNavigate: (view: View) => void
  onUrgentHelp: () => void
  teamMode?: boolean
  onOpenCaregiver: () => void
}

const navItems = [
  { id: 'ask' as const, label: 'Ask', icon: Search },
  { id: 'resources' as const, label: 'Resources', icon: Waypoints },
]

export function Header({ view, onNavigate, onUrgentHelp, teamMode = false, onOpenCaregiver }: HeaderProps) {
  const isAskView = view === 'ask' || view === 'plan'
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={teamMode ? onOpenCaregiver : () => onNavigate('ask')} aria-label={teamMode ? 'Open Flex and Care caregiver experience' : 'Flex and Care home'}>
        <BrandMark />
        <span className="brand__type">
          <strong>Flex and Care</strong>
          <span>Guam</span>
        </span>
      </button>

      <div className="header-actions">
        {teamMode ? (
          <div className="team-header-actions">
            <span><BookOpenCheck size={16} /> Content team workspace</span>
            <button type="button" onClick={onOpenCaregiver}>Open caregiver experience <ExternalLink size={15} /></button>
          </div>
        ) : (
          <>
            <button className="urgent-help-button" type="button" onClick={onUrgentHelp}>
              <ShieldAlert size={16} /> Urgent help
            </button>
            <nav className="primary-nav" aria-label="Main navigation">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = item.id === 'ask' ? isAskView : view === item.id
                return (
                  <button
                    key={item.id}
                    className={`nav-button ${active ? 'nav-button--active' : ''}`}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon size={16} strokeWidth={2} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </>
        )}
      </div>
    </header>
  )
}
