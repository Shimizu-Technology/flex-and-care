import { useEffect, useRef, useState } from 'react'
import { AnswerView } from './components/AnswerView'
import { AskView } from './components/AskView'
import { FallbackView } from './components/FallbackView'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PlanBuilder } from './components/PlanBuilder'
import { ResourcesView } from './components/ResourcesView'
import { ReviewView } from './components/ReviewView'
import { UrgentHelpModal } from './components/UrgentHelpModal'
import { matchGuidance } from './lib/matchGuidance'
import type { Guidance, View } from './types'

type Result = { question: string; answer: Guidance | null } | null

export default function App() {
  const [view, setView] = useState<View>(() => new URLSearchParams(window.location.search).get('team') === '1' ? 'review' : 'ask')
  const [result, setResult] = useState<Result>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [urgentHelpOpen, setUrgentHelpOpen] = useState(false)
  const searchTimer = useRef<number | null>(null)

  useEffect(() => () => {
    if (searchTimer.current) window.clearTimeout(searchTimer.current)
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [view, result])

  function navigate(nextView: View) {
    if (searchTimer.current) window.clearTimeout(searchTimer.current)
    setIsLoading(false)
    setView(nextView)
    if (nextView !== 'ask') setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function askQuestion(question: string) {
    setIsLoading(true)
    if (searchTimer.current) window.clearTimeout(searchTimer.current)
    searchTimer.current = window.setTimeout(() => {
      setResult({ question, answer: matchGuidance(question) })
      setIsLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 550)
  }

  function resetQuestion() {
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openCaregiverExperience() {
    const url = new URL(window.location.href)
    url.searchParams.delete('team')
    window.history.replaceState({}, '', url)
    navigate('ask')
  }

  const teamMode = view === 'review'

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="demo-ribbon">
        <span>{teamMode ? 'Content workspace preview' : 'Visual concept'}</span>
        {teamMode ? 'Private content-management preview' : 'Program details should be confirmed directly with the listed organization'}
      </div>
      <Header view={view} onNavigate={navigate} onUrgentHelp={() => setUrgentHelpOpen(true)} teamMode={teamMode} onOpenCaregiver={openCaregiverExperience} />
      {view === 'ask' && !result && <AskView onAsk={askQuestion} onBuildPlan={() => navigate('plan')} isLoading={isLoading} />}
      {view === 'ask' && result?.answer && <AnswerView answer={result.answer} onBack={resetQuestion} />}
      {view === 'ask' && result && !result.answer && (
        <FallbackView question={result.question} onBack={resetQuestion} onResources={() => navigate('resources')} />
      )}
      {view === 'resources' && <ResourcesView />}
      {view === 'review' && <ReviewView />}
      {view === 'plan' && <PlanBuilder onBack={() => navigate('ask')} onUrgentHelp={() => setUrgentHelpOpen(true)} />}
      {!teamMode && <Footer />}
      {!teamMode && <UrgentHelpModal open={urgentHelpOpen} onClose={() => setUrgentHelpOpen(false)} />}
    </div>
  )
}
