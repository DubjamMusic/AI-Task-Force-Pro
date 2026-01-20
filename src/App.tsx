import { useState, useEffect } from 'react'
import './App.css'
import LiveDashboard from './components/LiveDashboard'
import QuestGallery from './components/QuestGallery'
import AIChat from './components/AIChat'
import Pricing from './components/Pricing'
import Sidebar from './components/Sidebar'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [metrics, setMetrics] = useState({
    activeAgents: 12,
    tasksCompleted: 847,
    successRate: 94,
    xp: 2450,
    level: 7,
    rank: 'Architect'
  })

  // Update metrics every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeAgents: Math.max(8, Math.min(20, prev.activeAgents + Math.floor(Math.random() * 3) - 1)),
        tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 2),
        successRate: Math.max(90, Math.min(99, prev.successRate + (Math.random() > 0.5 ? 1 : -1))),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} metrics={metrics} />
      
      <div className="main-content">
        <header className="header">
          <h1>🚀 QuestForce AI Platform</h1>
          <p className="tagline">Your AI Workforce, Orchestrated</p>
        </header>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Live Dashboard
          </button>
          <button 
            className={`tab ${activeTab === 'quests' ? 'active' : ''}`}
            onClick={() => setActiveTab('quests')}
          >
            🎯 Quest Gallery
          </button>
          <button 
            className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 AI Assistant
          </button>
          <button 
            className={`tab ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            💎 Pricing
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'dashboard' && <LiveDashboard metrics={metrics} />}
          {activeTab === 'quests' && <QuestGallery />}
          {activeTab === 'chat' && <AIChat />}
          {activeTab === 'pricing' && <Pricing />}
        </div>
      </div>
    </div>
  )
}

export default App
