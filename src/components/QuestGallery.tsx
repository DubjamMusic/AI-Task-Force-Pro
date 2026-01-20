import { useState } from 'react'
import './QuestGallery.css'

interface Quest {
  id: number
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  xp: number
  rating: number
  downloads: number
  tags: string[]
  icon: string
}

function QuestGallery() {
  const quests: Quest[] = [
    {
      id: 1,
      title: 'Code Review Master',
      description: 'Automatically review pull requests and provide intelligent feedback',
      difficulty: 'Easy',
      xp: 100,
      rating: 4.8,
      downloads: 1234,
      tags: ['Code Review', 'Git', 'CI/CD'],
      icon: '🔍'
    },
    {
      id: 2,
      title: 'Test Generator Pro',
      description: 'Generate comprehensive unit tests for your codebase',
      difficulty: 'Medium',
      xp: 250,
      rating: 4.9,
      downloads: 2156,
      tags: ['Testing', 'Automation', 'Quality'],
      icon: '🧪'
    },
    {
      id: 3,
      title: 'Documentation Wizard',
      description: 'Create beautiful documentation from your code comments',
      difficulty: 'Easy',
      xp: 150,
      rating: 4.7,
      downloads: 987,
      tags: ['Documentation', 'Markdown', 'API'],
      icon: '📚'
    },
    {
      id: 4,
      title: 'Security Sentinel',
      description: 'Scan for vulnerabilities and security issues in real-time',
      difficulty: 'Hard',
      xp: 500,
      rating: 4.9,
      downloads: 3421,
      tags: ['Security', 'Scanning', 'Audit'],
      icon: '🛡️'
    },
    {
      id: 5,
      title: 'Performance Optimizer',
      description: 'Identify and fix performance bottlenecks automatically',
      difficulty: 'Hard',
      xp: 450,
      rating: 4.6,
      downloads: 1543,
      tags: ['Performance', 'Optimization', 'Analysis'],
      icon: '⚡'
    },
    {
      id: 6,
      title: 'Database Schema Designer',
      description: 'Design and optimize database schemas with AI assistance',
      difficulty: 'Medium',
      xp: 300,
      rating: 4.8,
      downloads: 876,
      tags: ['Database', 'Schema', 'Design'],
      icon: '🗄️'
    },
  ]

  const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All')

  const filteredQuests = filter === 'All' 
    ? quests 
    : quests.filter(q => q.difficulty === filter)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4caf50'
      case 'Medium': return '#ff9800'
      case 'Hard': return '#f44336'
      default: return '#999'
    }
  }

  return (
    <div className="quest-gallery fade-in">
      <div className="gallery-header">
        <h2>🎯 Quest Gallery</h2>
        <p>Browse AI workflow templates and boost your productivity</p>
      </div>

      <div className="filter-bar">
        <button 
          className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
          onClick={() => setFilter('All')}
        >
          All Quests
        </button>
        <button 
          className={`filter-btn ${filter === 'Easy' ? 'active' : ''}`}
          onClick={() => setFilter('Easy')}
        >
          🟢 Easy
        </button>
        <button 
          className={`filter-btn ${filter === 'Medium' ? 'active' : ''}`}
          onClick={() => setFilter('Medium')}
        >
          🟡 Medium
        </button>
        <button 
          className={`filter-btn ${filter === 'Hard' ? 'active' : ''}`}
          onClick={() => setFilter('Hard')}
        >
          🔴 Hard
        </button>
      </div>

      <div className="quest-grid">
        {filteredQuests.map((quest) => (
          <div key={quest.id} className="quest-card">
            <div className="quest-icon">{quest.icon}</div>
            <div className="quest-content">
              <h3 className="quest-title">{quest.title}</h3>
              <p className="quest-description">{quest.description}</p>
              
              <div className="quest-tags">
                {quest.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>

              <div className="quest-meta">
                <div className="difficulty-badge" style={{ background: getDifficultyColor(quest.difficulty) }}>
                  {quest.difficulty}
                </div>
                <div className="xp-badge">
                  ⚡ {quest.xp} XP
                </div>
              </div>

              <div className="quest-stats">
                <span className="rating">⭐ {quest.rating}</span>
                <span className="downloads">📥 {quest.downloads.toLocaleString()}</span>
              </div>

              <button className="clone-btn">
                🚀 Clone Quest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestGallery
