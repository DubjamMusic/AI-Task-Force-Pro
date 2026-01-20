import { useState, useEffect } from 'react'
import './LiveDashboard.css'

interface LiveDashboardProps {
  metrics: {
    activeAgents: number
    tasksCompleted: number
    successRate: number
    xp: number
    level: number
    rank: string
  }
}

interface Activity {
  id: number
  agent: string
  action: string
  time: string
  status: 'success' | 'processing' | 'error'
}

function LiveDashboard({ metrics }: LiveDashboardProps) {
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, agent: 'CodeAgent-Alpha', action: 'Deployed v2.1.0 to production', time: '2s ago', status: 'success' },
    { id: 2, agent: 'DataProcessor-Beta', action: 'Processing 10,000 records...', time: '5s ago', status: 'processing' },
    { id: 3, agent: 'TestRunner-Gamma', action: 'All tests passed ✓', time: '12s ago', status: 'success' },
    { id: 4, agent: 'SecurityScan-Delta', action: 'Vulnerability scan complete', time: '18s ago', status: 'success' },
  ])

  const agents = [
    { name: 'CodeAgent-Alpha', status: 'active', tasks: 156 },
    { name: 'DataProcessor-Beta', status: 'active', tasks: 243 },
    { name: 'TestRunner-Gamma', status: 'active', tasks: 89 },
    { name: 'SecurityScan-Delta', status: 'active', tasks: 67 },
    { name: 'DocWriter-Epsilon', status: 'idle', tasks: 34 },
    { name: 'APIMonitor-Zeta', status: 'active', tasks: 198 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        agent: agents[Math.floor(Math.random() * agents.length)].name,
        action: [
          'Completed code review',
          'Deployed new feature',
          'Fixed critical bug',
          'Updated documentation',
          'Optimized query performance',
          'Passed security audit'
        ][Math.floor(Math.random() * 6)],
        time: 'Just now',
        status: Math.random() > 0.1 ? 'success' : 'processing'
      }
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="live-dashboard fade-in">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">🤖</div>
          <div className="metric-content">
            <div className="metric-label">Active Agents</div>
            <div className="metric-value">{metrics.activeAgents}</div>
            <div className="metric-change pulse">+2 from last hour</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <div className="metric-label">Tasks Completed</div>
            <div className="metric-value">{metrics.tasksCompleted}</div>
            <div className="metric-change">+47 today</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <div className="metric-label">Success Rate</div>
            <div className="metric-value">{metrics.successRate}%</div>
            <div className="metric-change">↑ 2.1%</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <div className="metric-label">XP Earned</div>
            <div className="metric-value">{metrics.xp}</div>
            <div className="metric-change">Level {metrics.level}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>🌐 Active Agent Network</h2>
        <div className="agent-grid">
          {agents.map((agent, index) => (
            <div key={index} className={`agent-card ${agent.status}`}>
              <div className="agent-header">
                <span className="agent-name">{agent.name}</span>
                <span className={`status-badge ${agent.status}`}>
                  {agent.status === 'active' ? <span className="pulse">●</span> : '○'}
                  {agent.status}
                </span>
              </div>
              <div className="agent-stats">
                <span>Tasks: {agent.tasks}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>📊 Live Activity Stream</h2>
        <div className="activity-stream">
          {activities.map((activity) => (
            <div key={activity.id} className={`activity-item slide-in ${activity.status}`}>
              <div className="activity-icon">
                {activity.status === 'success' ? '✓' : activity.status === 'processing' ? '⟳' : '⚠'}
              </div>
              <div className="activity-content">
                <div className="activity-agent">{activity.agent}</div>
                <div className="activity-action">{activity.action}</div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LiveDashboard
