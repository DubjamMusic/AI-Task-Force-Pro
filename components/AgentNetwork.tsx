'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'processing';
  task: string;
  progress: number;
}

interface Activity {
  id: string;
  agentName: string;
  action: string;
  timestamp: Date;
}

export default function AgentNetwork() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: '1', name: 'Data Analyzer', status: 'active', task: 'Processing dataset', progress: 75 },
    { id: '2', name: 'Code Generator', status: 'processing', task: 'Creating components', progress: 45 },
    { id: '3', name: 'Content Writer', status: 'idle', task: 'Waiting for input', progress: 0 },
    { id: '4', name: 'Image Processor', status: 'active', task: 'Optimizing images', progress: 90 },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', agentName: 'Data Analyzer', action: 'Started processing dataset', timestamp: new Date(Date.now() - 5000) },
    { id: '2', agentName: 'Code Generator', action: 'Generated 3 components', timestamp: new Date(Date.now() - 15000) },
    { id: '3', agentName: 'Image Processor', action: 'Optimized 45 images', timestamp: new Date(Date.now() - 30000) },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prevAgents =>
        prevAgents.map(agent => ({
          ...agent,
          progress: agent.status === 'active' || agent.status === 'processing'
            ? Math.min(100, agent.progress + Math.random() * 5)
            : agent.progress,
        }))
      );

      // Add new activity occasionally
      if (Math.random() > 0.7) {
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        const newActivity: Activity = {
          id: Date.now().toString(),
          agentName: randomAgent.name,
          action: ['Completed task', 'Processing data', 'Generated output', 'Updated model'][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
        };
        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [agents]);

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'idle':
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'processing':
        return 'Processing';
      case 'idle':
        return 'Idle';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Active Agent Network
        </h2>
        
        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {agents.map(agent => (
            <div
              key={agent.id}
              className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow"
            >
              {/* Pulse effect for active agents */}
              {(agent.status === 'active' || agent.status === 'processing') && (
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <div className="absolute w-full h-full bg-green-400 rounded-full animate-ping"></div>
                  <div className="relative w-full h-full bg-green-500 rounded-full"></div>
                </div>
              )}
              
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)} mr-2 ${agent.status !== 'idle' ? 'animate-pulse-glow' : ''}`}></div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-medium">{getStatusText(agent.status)}</span>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{agent.task}</p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    agent.status === 'active' ? 'bg-green-500' :
                    agent.status === 'processing' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                  style={{ width: `${agent.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                {Math.round(agent.progress)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Activity Stream */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Live Activity Stream
        </h3>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              style={{ animation: index === 0 ? 'slideIn 0.5s ease-out' : 'none' }}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    {activity.agentName}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {activity.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
