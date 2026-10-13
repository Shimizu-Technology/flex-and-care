import { useEffect, useState } from 'react'
import { AnswerView } from './components/AnswerView'
import { AskView } from './components/AskView'
import { GuidanceSearchView } from './components/GuidanceSearchView'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PlanBuilder } from './components/PlanBuilder'
import { ResourcesView } from './components/ResourcesView'
import { ReviewView } from './components/ReviewView'
import { UrgentHelpModal } from './components/UrgentHelpModal'
import { hasExplicitDanger, searchGuidance } from './lib/matchGuidance'
import type { Guidance, View } from './types'

type Result = { question: string; matches: Guidance[]; urgent: boolean; answer?: Guidance } | null

export default function App() {
  const [view, setView] = useState<View>(() => new URLSearchParams(window.location.search).get('team') === '1' ? 'review' : 'ask')
  const [result, setResult] = useState<Result>(null)
  const [query, setQuery] = useState('')
  const [urgentHelpOpen, setUrgentHelpOpen] = useState(false)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [view, result])

  function navigate(nextView: View) {
    setView(nextView)
    if (nextView !== 'ask') setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function askQuestion(question: string) {
    setQuery(question)
    setResult({ question, matches: searchGuidance(question), urgent: hasExplicitDanger(question) })
    window.scrollTo({ top: 0, behavior: 'instant' })
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

  function chooseAnswer(answer: Guidance) {
    setResult({ question: answer.question, matches: [], urgent: false, answer })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const teamMode = view === 'review'

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header view={view} onNavigate={navigate} onUrgentHelp={() => setUrgentHelpOpen(true)} teamMode={teamMode} onOpenCaregiver={openCaregiverExperience} />
      {view === 'ask' && !result && <AskView onAsk={askQuestion} onChoose={chooseAnswer} onBuildPlan={() => navigate('plan')} isLoading={false} initialQuestion={query} />}
      {view === 'ask' && result?.answer && <AnswerView answer={result.answer} onBack={resetQuestion} />}
      {view === 'ask' && result && !result.answer && (
        <GuidanceSearchView question={result.question} matches={result.matches} urgent={result.urgent} onChoose={chooseAnswer} onBack={resetQuestion} onResources={() => navigate('resources')} onUrgentHelp={() => setUrgentHelpOpen(true)} />
      )}
      {view === 'resources' && <ResourcesView />}
      {view === 'review' && <ReviewView />}
      {view === 'plan' && <PlanBuilder onBack={() => navigate('ask')} onUrgentHelp={() => setUrgentHelpOpen(true)} />}
      {!teamMode && <Footer />}
      {!teamMode && <UrgentHelpModal open={urgentHelpOpen} onClose={() => setUrgentHelpOpen(false)} />}
    </div>
  )
}
