import React, { useState, useEffect } from 'react';
import { Check, X, Zap, TrendingUp, Users, Award, Search, Filter, Star, Download, BarChart3, Globe, MessageSquare, Sparkles, ChevronRight, ArrowRight, DollarSign, Calendar, Activity, Shield, Rocket, Brain, Cpu, Network, Target, Plus, Lock, Send } from 'lucide-react';

const QuestForcePlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: 'Welcome to QuestForce AI! I can help you orchestrate agents, create quests, or answer questions.' }
  ]);
  const [userInput, setUserInput] = useState('');

  const [liveMetrics, setLiveMetrics] = useState({
    activeAgents: 487,
    questsRunning: 1243,
    apiCallsPerMin: 15234,
    successRate: 94.3
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeAgents: prev.activeAgents + Math.floor(Math.random() * 3) - 1,
        questsRunning: prev.questsRunning + Math.floor(Math.random() * 10) - 5,
        apiCallsPerMin: prev.apiCallsPerMin + Math.floor(Math.random() * 100) - 50,
        successRate: Math.min(99.9, Math.max(90, prev.successRate + (Math.random() - 0.5) * 0.5))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAIChat = () => {
    if (!userInput.trim()) return;
    
    const newMessage = { role: 'user', content: userInput };
    setAiMessages(prev => [...prev, newMessage]);
    setUserInput('');

    setTimeout(() => {
      const responses = [
        "I can help you create a new quest! What task would you like to automate?",
        "Great question! QuestForce uses multi-agent orchestration to break down complex tasks.",
        "Your current plan includes 500 quest credits per month. Would you like to upgrade?",
        "I've analyzed your usage. You're getting a 94.3% success rate on your quests!",
        "Let me show you how to configure a Sales SDR Agent for lead qualification..."
      ];
      setAiMessages(prev => [...prev, {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)]
      }]);
    }, 1000);
  };

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      rank: 'Apprentice',
      price: { monthly: 79, annual: 790 },
      xp: '100 XP/month',
      badge: '🥉',
      features: [
        '100 quest credits/month',
        'Up to 5 active agents',
        'GPT-3.5 + Claude Haiku',
        '30-day history',
        'Community support',
        'Basic analytics'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'pro',
      name: 'Pro',
      rank: 'Guardian',
      badge: '🥈',
      popular: true,
      price: { monthly: 199, annual: 1990 },
      xp: '500 XP/month',
      features: [
        '500 quest credits/month',
        'Up to 15 active agents',
        'All LLM models',
        '1-year history',
        'Team collaboration (5 seats)',
        'Priority support',
        'Advanced analytics + API'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'business',
      name: 'Business',
      rank: 'Architect',
      badge: '🥇',
      price: { monthly: 499, annual: 4990 },
      xp: '2,500 XP/month',
      features: [
        '2,500 quest credits/month',
        'Unlimited agents',
        '10 seats included',
        'Dedicated success manager',
        'White-label option',
        'Custom integrations (3)'
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      rank: 'Legend',
      badge: '💎',
      price: { monthly: 2000, annual: 20000 },
      xp: 'Unlimited XP',
      custom: true,
      features: [
        'Unlimited everything',
        'On-premise deployment',
        'SSO/SAML',
        'Custom fine-tuning',
        '24/7 phone support',
        'Quarterly reviews'
      ],
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const activeAgents = [
    { id: 1, name: 'Planner-Alpha', status: 'active', tasks: 23, type: 'planner' },
    { id: 2, name: 'Executor-Beta', status: 'active', tasks: 45, type: 'executor' },
    { id: 3, name: 'Monitor-Gamma', status: 'idle', tasks: 12, type: 'monitor' },
    { id: 4, name: 'Data-Delta', status: 'active', tasks: 67, type: 'data' },
    { id: 5, name: 'Sales-SDR-1', status: 'active', tasks: 34, type: 'sales' },
    { id: 6, name: 'Content-Writer', status: 'active', tasks: 19, type: 'content' }
  ];

  const questTemplates = [
    {
      id: 1,
      title: 'Cold Email AI Campaign',
      difficulty: 'Medium',
      xpReward: 250,
      category: 'Sales',
      description: 'Automated outreach with AI-personalized emails',
      price: 49,
      rating: 4.9,
      downloads: 1243,
      badge: '⚡ Featured'
    },
    {
      id: 2,
      title: 'Lead Qualification Engine',
      difficulty: 'Hard',
      xpReward: 500,
      category: 'Sales',
      description: 'AI-powered lead scoring and routing',
      price: 99,
      rating: 5.0,
      downloads: 2156,
      badge: '🏆 Top Rated'
    },
    {
      id: 3,
      title: 'Social Media Pipeline',
      difficulty: 'Easy',
      xpReward: 150,
      category: 'Marketing',
      description: 'Generate and schedule social content',
      price: 79,
      rating: 4.8,
      downloads: 892
    },
    {
      id: 4,
      title: 'SEO Content Factory',
      difficulty: 'Medium',
      xpReward: 300,
      category: 'Marketing',
      description: 'Research, write, and optimize SEO content',
      price: 129,
      rating: 4.7,
      downloads: 1567
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <nav className="border-b border-purple-500/20 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  QuestForce AI
                </h1>
                <p className="text-xs text-purple-300">Your AI Workforce, Orchestrated</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-400">{liveMetrics.activeAgents} Active Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">{liveMetrics.questsRunning} Quests Running</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">{liveMetrics.successRate.toFixed(1)}% Success</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-purple-300 hover:text-white transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex max-w-7xl mx-auto">
        <aside className="w-64 border-r border-purple-500/20 bg-black/20 min-h-screen p-6 hidden lg:block">
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Live Dashboard', icon: BarChart3, badge: 'NEW' },
              { id: 'agents', label: 'Agent Network', icon: Network, badge: `${liveMetrics.activeAgents}` },
              { id: 'quests', label: 'Quest Gallery', icon: Globe },
              { id: 'marketplace', label: 'Marketplace', icon: Award },
              { id: 'ai-chat', label: 'AI Assistant', icon: MessageSquare, badge: '🤖' },
              { id: 'pricing', label: 'Pricing', icon: DollarSign },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'enterprise', label: 'Enterprise', icon: Rocket }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
            <h3 className="text-sm font-bold mb-3 text-purple-300">Your Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Level 12</span>
                  <span className="text-purple-400">4,350 XP</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-3/4" />
                </div>
              </div>
              <div className="text-xs text-gray-400">
                <p>Rank: <span className="text-purple-400 font-semibold">Guardian</span></p>
                <p className="mt-1">Credits: <span className="text-green-400">234/500</span></p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Live Command Center
                  </h2>
                  <p className="text-gray-400 mt-1">Real-time agent orchestration and monitoring</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Quest
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: 'Active Agents', value: liveMetrics.activeAgents, icon: Cpu, color: 'text-blue-400', change: '+12' },
                  { label: 'Quests Running', value: liveMetrics.questsRunning, icon: Target, color: 'text-purple-400', change: '+45' },
                  { label: 'API Calls/min', value: liveMetrics.apiCallsPerMin.toLocaleString(), icon: Activity, color: 'text-green-400', change: '+8%' },
                  { label: 'Success Rate', value: `${liveMetrics.successRate.toFixed(1)}%`, icon: TrendingUp, color: 'text-orange-400', change: '+2.3%' }
                ].map((metric, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <metric.icon className={`w-8 h-8 ${metric.color}`} />
                      <span className="text-green-400 text-xs font-semibold">{metric.change}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Network className="w-5 h-5 text-purple-400" />
                  Active Agent Network
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {activeAgents.map(agent => (
                    <div
                      key={agent.id}
                      className="p-4 rounded-lg border bg-white/5 border-white/10 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            agent.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
                          }`} />
                          <h4 className="font-semibold text-sm">{agent.name}</h4>
                        </div>
                        <Brain className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{agent.type}</span>
                        <span className="text-purple-400 font-semibold">{agent.tasks} tasks</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Live Activity Stream
                </h3>
                <div className="space-y-2">
                  {[
                    { time: '2s ago', agent: 'Sales-SDR-1', action: 'Qualified lead: TechCorp Inc.', status: 'success' },
                    { time: '5s ago', agent: 'Content-Writer', action: 'Generated blog post: "AI in 2026"', status: 'success' },
                    { time: '12s ago', agent: 'Planner-Alpha', action: 'Created 5 subtasks for Quest #1243', status: 'success' },
                    { time: '18s ago', agent: 'Data-Delta', action: 'Processed 2,341 records', status: 'success' }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-400' : 'bg-yellow-400'
                        }`} />
                        <div>
                          <p className="text-sm font-semibold">{activity.action}</p>
                          <p className="text-xs text-gray-400">{activity.agent} • {activity.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Quest Gallery</h2>
                  <p className="text-gray-400">Browse and clone proven AI workflows</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {questTemplates.map(quest => (
                  <div key={quest.id} className="group bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 overflow-hidden transition-all">
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">
                              {quest.title}
                            </h3>
                            {quest.badge && <span className="text-xs">{quest.badge}</span>}
                          </div>
                          <p className="text-sm text-gray-400">{quest.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          quest.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          quest.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {quest.difficulty}
                        </span>
                        <span className="text-purple-400 font-semibold">+{quest.xpReward} XP</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {quest.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {quest.downloads}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-purple-400">${quest.price}</span>
                          <button className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
                            Clone
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai-chat' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <MessageSquare className="w-8 h-8 text-purple-400" />
                  AI Assistant
                </h2>
                <p className="text-gray-400">Get help with quests, agents, and platform features</p>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {aiMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-4 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-purple-500/20 text-white'
                          : 'bg-white/10 text-gray-200'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleAIChat()}
                      placeholder="Ask me anything about QuestForce..."
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg outline-none focus:border-purple-500 transition-colors"
                    />
                    <button
                      onClick={handleAIChat}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Choose Your Plan
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Start with a 14-day trial. All features unlocked.
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      billingCycle === 'monthly'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      billingCycle === 'annual'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    Annual
                    <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                      Save 17%
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pricingPlans.map(plan => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl p-6 border transition-all ${
                      selectedPlan === plan.id
                        ? 'border-purple-500 bg-purple-500/10 shadow-xl shadow-purple-500/20'
                        : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-semibold rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-2xl mb-1">{plan.badge}</div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <p className="text-sm text-purple-400">{plan.rank}</p>
                      </div>
                      
                      <div className="flex items-baseline gap-2">
                        {plan.custom ? (
                          <span className="text-3xl font-bold">Custom</span>
                        ) : (
                          <>
                            <span className="text-4xl font-bold">
                              ${billingCycle === 'monthly' ? plan.price.monthly : Math.round(plan.price.annual / 12)}
                            </span>
                            <span className="text-gray-400">/mo</span>
                          </>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`w-full py-3 rounded-lg font-semibold transition-all ${
                          selectedPlan === plan.id
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {plan.custom ? 'Contact Sales' : 'Start Free Trial'}
                      </button>
                      
                      <div className="space-y-2 pt-4">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default QuestForcePlatform;
