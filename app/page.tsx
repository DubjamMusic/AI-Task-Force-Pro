'use client';

import { useState } from 'react';
import AgentNetwork from '@/components/AgentNetwork';
import WorkflowTemplates from '@/components/WorkflowTemplates';
import AIChat from '@/components/AIChat';
import PricingPlans from '@/components/PricingPlans';
import GamificationStats from '@/components/GamificationStats';

type View = 'dashboard' | 'templates' | 'chat' | 'pricing';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Task Force Pro
                </h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                    { id: 'templates', label: 'Templates', icon: '📋' },
                    { id: 'chat', label: 'AI Chat', icon: '💬' },
                    { id: 'pricing', label: 'Pricing', icon: '💳' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id as View)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        currentView === item.id
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></span>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  U
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white">
              <h2 className="text-4xl font-bold mb-2">Your AI Workforce, Orchestrated</h2>
              <p className="text-xl opacity-90">
                Manage, monitor, and maximize your AI agents in real-time
              </p>
            </div>

            {/* Stats and Agents Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AgentNetwork />
              </div>
              <div>
                <GamificationStats />
              </div>
            </div>
          </div>
        )}

        {currentView === 'templates' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                AI Workflow Templates
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Browse and clone ready-to-use AI workflows to accelerate your projects
              </p>
            </div>
            <WorkflowTemplates />
          </div>
        )}

        {currentView === 'chat' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                AI Assistant
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Get instant help with your workflows, troubleshooting, and optimization
              </p>
            </div>
            <AIChat />
          </div>
        )}

        {currentView === 'pricing' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white text-center">
              <h2 className="text-4xl font-bold mb-2">Choose Your Perfect Plan</h2>
              <p className="text-xl opacity-90">
                Scale your AI workforce as you grow
              </p>
            </div>
            <PricingPlans />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2026 AI Task Force Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Documentation
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                API
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
