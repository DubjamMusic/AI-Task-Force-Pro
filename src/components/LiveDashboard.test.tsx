import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LiveDashboard from './LiveDashboard'

// Mock the CSS import
jest.mock('./LiveDashboard.css', () => ({}))

describe('LiveDashboard Component', () => {
  // Default mock metrics for testing
  const mockMetrics = {
    activeAgents: 24,
    tasksCompleted: 1247,
    successRate: 98.7,
    xp: 45620,
    level: 12,
    rank: 'Elite Commander',
  }

  beforeEach(() => {
    jest.clearAllTimers()
    jest.useFakeTimers()
    jest.spyOn(global, 'setInterval')
    jest.spyOn(global, 'clearInterval')
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  describe('Metrics Rendering', () => {
    it('renders all four metric cards', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(screen.getByText('Active Agents')).toBeInTheDocument()
      expect(screen.getByText('Tasks Completed')).toBeInTheDocument()
      expect(screen.getByText('Success Rate')).toBeInTheDocument()
      expect(screen.getByText('XP Earned')).toBeInTheDocument()
    })

    it('displays correct metric values from props', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(screen.getByText('24')).toBeInTheDocument() // activeAgents
      expect(screen.getByText('1247')).toBeInTheDocument() // tasksCompleted
      expect(screen.getByText('98.7%')).toBeInTheDocument() // successRate
      expect(screen.getByText('45620')).toBeInTheDocument() // xp
    })

    it('displays the correct level', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(screen.getByText('Level 12')).toBeInTheDocument()
    })

    it('renders metric icons', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const metricIcons = container.querySelectorAll('.metric-icon')
      expect(metricIcons).toHaveLength(4)
      expect(metricIcons[0]).toHaveTextContent('🤖')
      expect(metricIcons[1]).toHaveTextContent('✅')
      expect(metricIcons[2]).toHaveTextContent('📈')
      expect(metricIcons[3]).toHaveTextContent('⚡')
    })

    it('renders metric change indicators', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(screen.getByText('+2 from last hour')).toBeInTheDocument()
      expect(screen.getByText('+47 today')).toBeInTheDocument()
      expect(screen.getByText('↑ 2.1%')).toBeInTheDocument()
    })
  })

  describe('Edge Cases - Metrics', () => {
    it('handles zero values for all metrics', () => {
      const zeroMetrics = {
        activeAgents: 0,
        tasksCompleted: 0,
        successRate: 0,
        xp: 0,
        level: 0,
        rank: 'Beginner',
      }

      render(<LiveDashboard metrics={zeroMetrics} />)

      // Check each metric individually since they have different containers
      const metricValues = screen.getAllByText('0')
      expect(metricValues.length).toBeGreaterThanOrEqual(3) // At least 3 zeros displayed
      expect(screen.getByText('0%')).toBeInTheDocument()
      expect(screen.getByText('Level 0')).toBeInTheDocument()
    })

    it('handles very large metric values', () => {
      const largeMetrics = {
        activeAgents: 999999,
        tasksCompleted: 5000000,
        successRate: 100,
        xp: 10000000,
        level: 999,
        rank: 'Legendary',
      }

      render(<LiveDashboard metrics={largeMetrics} />)

      expect(screen.getByText('999999')).toBeInTheDocument()
      expect(screen.getByText('5000000')).toBeInTheDocument()
      expect(screen.getByText('100%')).toBeInTheDocument()
      expect(screen.getByText('10000000')).toBeInTheDocument()
      expect(screen.getByText('Level 999')).toBeInTheDocument()
    })

    it('handles decimal success rates', () => {
      const decimalMetrics = {
        ...mockMetrics,
        successRate: 95.456,
      }

      render(<LiveDashboard metrics={decimalMetrics} />)

      expect(screen.getByText('95.456%')).toBeInTheDocument()
    })
  })

  describe('Active Agent Network', () => {
    it('renders the Active Agent Network section heading', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(screen.getByText('🌐 Active Agent Network')).toBeInTheDocument()
    })

    it('renders all 6 agent cards', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const agentCards = container.querySelectorAll('.agent-card')
      expect(agentCards).toHaveLength(6)
    })

    it('displays correct agent names', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      // Agent names appear in both agent cards and activity stream, so we use getAllByText
      expect(screen.getAllByText('CodeAgent-Alpha').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('DataProcessor-Beta').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('TestRunner-Gamma').length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText('SecurityScan-Delta').length).toBeGreaterThanOrEqual(1)
      expect(screen.getByText('DocWriter-Epsilon')).toBeInTheDocument()
      expect(screen.getByText('APIMonitor-Zeta')).toBeInTheDocument()
    })

    it('displays correct task counts for each agent', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(screen.getByText('Tasks: 156')).toBeInTheDocument()
      expect(screen.getByText('Tasks: 243')).toBeInTheDocument()
      expect(screen.getByText('Tasks: 89')).toBeInTheDocument()
      expect(screen.getByText('Tasks: 67')).toBeInTheDocument()
      expect(screen.getByText('Tasks: 34')).toBeInTheDocument()
      expect(screen.getByText('Tasks: 198')).toBeInTheDocument()
    })

    it('renders status badges for all agents', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const statusBadges = container.querySelectorAll('.status-badge')
      expect(statusBadges).toHaveLength(6)
    })

    it('correctly identifies active agents with pulse indicator', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const activeStatusBadges = container.querySelectorAll('.status-badge.active')
      expect(activeStatusBadges).toHaveLength(5)

      const pulseIndicators = container.querySelectorAll('.status-badge.active .pulse')
      expect(pulseIndicators).toHaveLength(5)
      pulseIndicators.forEach((indicator) => {
        expect(indicator).toHaveTextContent('●')
      })
    })

    it('correctly identifies idle agents', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const idleStatusBadges = container.querySelectorAll('.status-badge.idle')
      expect(idleStatusBadges).toHaveLength(1)
      expect(idleStatusBadges[0]).toHaveTextContent('○')
      expect(idleStatusBadges[0]).toHaveTextContent('idle')
    })

    it('applies correct CSS classes to active agent cards', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const activeCards = container.querySelectorAll('.agent-card.active')
      expect(activeCards).toHaveLength(5)
    })

    it('applies correct CSS classes to idle agent cards', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const idleCards = container.querySelectorAll('.agent-card.idle')
      expect(idleCards).toHaveLength(1)
    })
  })

  describe('Live Activity Stream', () => {
    it('renders the Live Activity Stream section heading', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(screen.getByText('📊 Live Activity Stream')).toBeInTheDocument()
    })

    it('renders initial 4 activity items', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const activityItems = container.querySelectorAll('.activity-item')
      expect(activityItems).toHaveLength(4)
    })

    it('displays correct initial activity agents', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      // Check within the activity stream section specifically
      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toBeInTheDocument()
      
      const activityAgents = activityStream!.querySelectorAll('.activity-agent')
      const agentNames = Array.from(activityAgents).map((el) => el.textContent)
      
      expect(agentNames).toContain('CodeAgent-Alpha')
      expect(agentNames).toContain('DataProcessor-Beta')
      expect(agentNames).toContain('TestRunner-Gamma')
      expect(agentNames).toContain('SecurityScan-Delta')
    })

    it('displays correct initial activity actions', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(screen.getByText('Deployed v2.1.0 to production')).toBeInTheDocument()
      expect(screen.getByText('Processing 10,000 records...')).toBeInTheDocument()
      expect(screen.getByText('All tests passed ✓')).toBeInTheDocument()
      expect(screen.getByText('Vulnerability scan complete')).toBeInTheDocument()
    })

    it('displays correct initial activity times', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(screen.getByText('2s ago')).toBeInTheDocument()
      expect(screen.getByText('5s ago')).toBeInTheDocument()
      expect(screen.getByText('12s ago')).toBeInTheDocument()
      expect(screen.getByText('18s ago')).toBeInTheDocument()
    })

    it('displays correct status icons for different activity statuses', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const activityIcons = container.querySelectorAll('.activity-icon')
      expect(activityIcons).toHaveLength(4)
      
      // First activity has success status (✓)
      expect(activityIcons[0]).toHaveTextContent('✓')
      
      // Second activity has processing status (⟳)
      expect(activityIcons[1]).toHaveTextContent('⟳')
      
      // Third and fourth have success status (✓)
      expect(activityIcons[2]).toHaveTextContent('✓')
      expect(activityIcons[3]).toHaveTextContent('✓')
    })

    it('applies correct CSS classes to activity items based on status', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const successItems = container.querySelectorAll('.activity-item.success')
      const processingItems = container.querySelectorAll('.activity-item.processing')

      expect(successItems.length).toBeGreaterThan(0)
      expect(processingItems.length).toBeGreaterThan(0)
    })

    it('applies slide-in class to all activity items', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const activityItems = container.querySelectorAll('.activity-item')
      activityItems.forEach((item) => {
        expect(item).toHaveClass('slide-in')
      })
    })
  })

  describe('useEffect Timer and Activity Updates', () => {
    it('sets up an interval that runs every 5 seconds', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      expect(setInterval).toHaveBeenCalledTimes(1)
      expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 5000)
    })

    it('adds a new activity after 5 seconds', async () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      // Initial state: 4 activities
      let activityItems = container.querySelectorAll('.activity-item')
      expect(activityItems).toHaveLength(4)

      // Fast-forward time by 5 seconds
      jest.advanceTimersByTime(5000)

      // Wait for state update
      await waitFor(() => {
        activityItems = container.querySelectorAll('.activity-item')
        expect(activityItems).toHaveLength(5)
      })
    })

    it('new activity displays "Just now" as time', async () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      jest.advanceTimersByTime(5000)

      await waitFor(() => {
        expect(screen.getByText('Just now')).toBeInTheDocument()
      })
    })

    it('adds multiple new activities over time', async () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      // Fast-forward by 15 seconds (3 intervals)
      jest.advanceTimersByTime(15000)

      await waitFor(() => {
        const activityItems = container.querySelectorAll('.activity-item')
        expect(activityItems).toHaveLength(7) // 4 initial + 3 new
      })
    })

    it('limits activities to maximum of 10 items', async () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      // Fast-forward by 50 seconds (10 intervals)
      jest.advanceTimersByTime(50000)

      await waitFor(() => {
        const activityItems = container.querySelectorAll('.activity-item')
        expect(activityItems.length).toBeLessThanOrEqual(10)
      })
    })

    it('new activities use random agent names from the list', async () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      jest.advanceTimersByTime(5000)

      await waitFor(() => {
        const allAgentNames = [
          'CodeAgent-Alpha',
          'DataProcessor-Beta',
          'TestRunner-Gamma',
          'SecurityScan-Delta',
          'DocWriter-Epsilon',
          'APIMonitor-Zeta'
        ]
        
        // The new activity should have one of the agent names
        const newActivity = screen.getByText('Just now').closest('.activity-item')
        const agentName = newActivity?.querySelector('.activity-agent')?.textContent
        
        expect(allAgentNames).toContain(agentName)
      })
    })

    it('new activities have random actions', async () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      jest.advanceTimersByTime(5000)

      await waitFor(() => {
        const possibleActions = [
          'Completed code review',
          'Deployed new feature',
          'Fixed critical bug',
          'Updated documentation',
          'Optimized query performance',
          'Passed security audit'
        ]
        
        // Find the new activity
        const newActivity = screen.getByText('Just now').closest('.activity-item')
        const actionText = newActivity?.querySelector('.activity-action')?.textContent
        
        expect(possibleActions).toContain(actionText)
      })
    })

    it('cleans up interval on component unmount', () => {
      const { unmount } = render(<LiveDashboard metrics={mockMetrics} />)

      unmount()

      expect(clearInterval).toHaveBeenCalledTimes(1)
    })
  })

  describe('Component Structure and CSS Classes', () => {
    it('renders main container with correct class', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const mainDiv = container.querySelector('.live-dashboard')
      expect(mainDiv).toBeInTheDocument()
      expect(mainDiv).toHaveClass('fade-in')
    })

    it('renders metrics grid container', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      expect(container.querySelector('.metrics-grid')).toBeInTheDocument()
    })

    it('renders all metric cards with correct class', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const metricCards = container.querySelectorAll('.metric-card')
      expect(metricCards).toHaveLength(4)
    })

    it('metric cards contain metric-content divs', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const metricContents = container.querySelectorAll('.metric-content')
      expect(metricContents).toHaveLength(4)
    })

    it('renders dashboard-section containers', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const dashboardSections = container.querySelectorAll('.dashboard-section')
      expect(dashboardSections).toHaveLength(2)
    })

    it('renders agent-grid container', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      expect(container.querySelector('.agent-grid')).toBeInTheDocument()
    })

    it('renders activity-stream container', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      expect(container.querySelector('.activity-stream')).toBeInTheDocument()
    })

    it('applies pulse class to active agents metric change', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      const metricChange = container.querySelector('.metric-change.pulse')
      expect(metricChange).toBeInTheDocument()
      expect(metricChange).toHaveTextContent('+2 from last hour')
    })
  })

  describe('Accessibility', () => {
    it('renders semantic HTML structure', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      expect(container.querySelector('h2')).toBeInTheDocument()
    })

    it('includes all section headings', () => {
      render(<LiveDashboard metrics={mockMetrics} />)

      const headings = screen.getAllByRole('heading', { level: 2 })
      expect(headings).toHaveLength(2)
      expect(headings[0]).toHaveTextContent('🌐 Active Agent Network')
      expect(headings[1]).toHaveTextContent('📊 Live Activity Stream')
    })
  })

  describe('Integration Tests', () => {
    it('renders complete dashboard with all sections', () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      // Verify all major sections exist
      expect(container.querySelector('.metrics-grid')).toBeInTheDocument()
      expect(container.querySelector('.agent-grid')).toBeInTheDocument()
      expect(container.querySelector('.activity-stream')).toBeInTheDocument()
      
      // Verify content is populated
      expect(container.querySelectorAll('.metric-card')).toHaveLength(4)
      expect(container.querySelectorAll('.agent-card')).toHaveLength(6)
      expect(container.querySelectorAll('.activity-item').length).toBeGreaterThan(0)
    })

    it('maintains state consistency across updates', async () => {
      const { container } = render(<LiveDashboard metrics={mockMetrics} />)

      // Initial state
      const initialActivities = container.querySelectorAll('.activity-item').length

      // Add new activity
      jest.advanceTimersByTime(5000)

      await waitFor(() => {
        const newActivities = container.querySelectorAll('.activity-item').length
        expect(newActivities).toBe(initialActivities + 1)
      })

      // Metrics should remain unchanged
      expect(screen.getByText('24')).toBeInTheDocument()
      expect(screen.getByText('1247')).toBeInTheDocument()
      
      // Agent cards should remain unchanged
      expect(container.querySelectorAll('.agent-card')).toHaveLength(6)
    })
  })
})
