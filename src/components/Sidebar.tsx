import './Sidebar.css'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  metrics: {
    activeAgents: number
    tasksCompleted: number
    successRate: number
    xp: number
    level: number
    rank: string
  }
}

function Sidebar({ activeTab, setActiveTab, metrics }: SidebarProps) {
  const xpToNextLevel = 3000
  const xpProgress = (metrics.xp / xpToNextLevel) * 100

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>⚡ QuestForce</h2>
        <div className="version">v1.0.0</div>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
          <span className="badge pulse">{metrics.activeAgents}</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'quests' ? 'active' : ''}`}
          onClick={() => setActiveTab('quests')}
        >
          <span className="nav-icon">🎯</span>
          <span>Quests</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <span className="nav-icon">💬</span>
          <span>AI Chat</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setActiveTab('pricing')}
        >
          <span className="nav-icon">💎</span>
          <span>Pricing</span>
        </button>
      </nav>

      <div className="progress-widget">
        <div className="widget-header">
          <h3>Progress Tracker</h3>
        </div>
        <div className="level-display">
          <div className="level-badge">Level {metrics.level}</div>
          <div className="rank-badge">{metrics.rank}</div>
        </div>
        <div className="xp-display">
          <div className="xp-text">
            <span>{metrics.xp} XP</span>
            <span className="xp-target">/ {xpToNextLevel} XP</span>
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${xpProgress}%` }}></div>
          </div>
        </div>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Tasks</span>
            <span className="stat-value">{metrics.tasksCompleted}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Success</span>
            <span className="stat-value">{metrics.successRate}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
