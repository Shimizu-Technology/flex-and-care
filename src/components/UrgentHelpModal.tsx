import { HeartHandshake, PhoneCall, ShieldAlert, Siren, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface UrgentHelpModalProps {
  open: boolean
  onClose: () => void
}

const urgentRoutes = [
  {
    title: 'Immediate danger or medical emergency',
    description: 'Someone is severely injured, missing, unable to breathe, or in immediate danger.',
    action: 'Call 911',
    href: 'tel:911',
    icon: Siren,
  },
  {
    title: 'Mental-health or emotional crisis',
    description: 'You or someone you care about needs immediate emotional or crisis support.',
    action: 'Call or text 988',
    href: 'tel:988',
    icon: PhoneCall,
  },
  {
    title: 'Possible abuse, neglect, or exploitation',
    description: 'You are worried about an older adult or an adult with a disability.',
    action: 'Call APS: (671) 632-8853',
    href: 'tel:+16716328853',
    icon: ShieldAlert,
  },
  {
    title: 'Overwhelmed and need caregiver support',
    description: 'You need respite information, counseling, training, or help finding the next step.',
    action: 'Call caregiver support: (671) 735-3277',
    href: 'tel:+16717353277',
    icon: HeartHandshake,
  },
]

export function UrgentHelpModal({ open, onClose }: UrgentHelpModalProps) {
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement as HTMLElement | null
    closeButton.current?.focus()
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>('.urgent-modal button, .urgent-modal a'))
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => { window.removeEventListener('keydown', handleKeyDown); previousFocus?.focus() }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="urgent-modal" role="dialog" aria-modal="true" aria-labelledby="urgent-help-title">
        <div className="urgent-modal__header">
          <div>
            <span>Human help first</span>
            <h2 id="urgent-help-title">What kind of help is needed?</h2>
          </div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close urgent help">
            <X size={20} />
          </button>
        </div>
        <p className="urgent-modal__intro">Choose the closest situation. These routes are always available without answering more questions.</p>
        <div className="urgent-route-list">
          {urgentRoutes.map((route) => {
            const Icon = route.icon
            return (
              <article key={route.title}>
                <Icon size={22} />
                <div>
                  <h3>{route.title}</h3>
                  <p>{route.description}</p>
                </div>
                <a href={route.href}>{route.action}</a>
              </article>
            )
          })}
        </div>
        <p className="urgent-modal__note">If you are unsure whether a situation is an emergency, call 911 and describe what is happening.</p>
      </section>
    </div>
  )
}
