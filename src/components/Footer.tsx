import { BrandMark } from './BrandMark'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand"><BrandMark /><span><strong>Flex and Care</strong>Caregiver guidance and local resources for Guam</span></div>
      <p>Information and starting points for caregivers on Guam. Not for medical diagnosis or emergencies.</p>
    </footer>
  )
}
