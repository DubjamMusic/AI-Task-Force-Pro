'use client';

import { useState, useEffect } from 'react';

interface UserStats {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  rank: string;
  totalWorkflows: number;
  completedTasks: number;
}

const ranks = [
  { name: 'Novice', minXP: 0, color: 'text-gray-600' },
  { name: 'Apprentice', minXP: 500, color: 'text-blue-600' },
  { name: 'Expert', minXP: 2000, color: 'text-purple-600' },
  { name: 'Master', minXP: 5000, color: 'text-yellow-600' },
  { name: 'Grandmaster', minXP: 10000, color: 'text-red-600' },
];

export default function GamificationStats() {
  const [stats, setStats] = useState<UserStats>({
    currentXP: 2750,
    nextLevelXP: 3000,
    level: 8,
    rank: 'Expert',
    totalWorkflows: 42,
    completedTasks: 156,
  });

  // Simulate real-time XP updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const newXP = prev.currentXP + Math.floor(Math.random() * 10);
        const progress = (newXP / prev.nextLevelXP) * 100;
        
        // Level up if XP exceeds threshold
        if (newXP >= prev.nextLevelXP) {
          return {
            ...prev,
            currentXP: newXP - prev.nextLevelXP,
            nextLevelXP: prev.nextLevelXP + 500,
            level: prev.level + 1,
          };
        }
        
        return { ...prev, currentXP: newXP };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getCurrentRank = () => {
    const totalXP = (stats.level - 1) * 500 + stats.currentXP;
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (totalXP >= ranks[i].minXP) {
        return ranks[i];
      }
    }
    return ranks[0];
  };

  const currentRank = getCurrentRank();
  const progressPercentage = (stats.currentXP / stats.nextLevelXP) * 100;

  return (
    <div className="w-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <svg className="w-7 h-7 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Your Progress
      </h2>

      {/* Rank Display */}
      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm opacity-90">Current Rank</p>
            <p className={`text-3xl font-bold ${currentRank.color}`}>
              {currentRank.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Level</p>
            <p className="text-3xl font-bold">{stats.level}</p>
          </div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Experience Points</span>
          <span className="text-sm font-semibold">
            {stats.currentXP} / {stats.nextLevelXP} XP
          </span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
          </div>
        </div>
        <p className="text-xs mt-1 opacity-80">
          {stats.nextLevelXP - stats.currentXP} XP until next level
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm opacity-90">Workflows</p>
          </div>
          <p className="text-3xl font-bold">{stats.totalWorkflows}</p>
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm opacity-90">Tasks</p>
          </div>
          <p className="text-3xl font-bold">{stats.completedTasks}</p>
        </div>
      </div>

      {/* Next Rank Preview */}
      <div className="mt-6 pt-4 border-t border-white border-opacity-30">
        <p className="text-sm opacity-90 mb-2">Next Rank</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            {ranks[Math.min(ranks.findIndex(r => r.name === currentRank.name) + 1, ranks.length - 1)].name}
          </span>
          <span className="text-sm opacity-80">
            {ranks[Math.min(ranks.findIndex(r => r.name === currentRank.name) + 1, ranks.length - 1)].minXP} XP Required
          </span>
        </div>
      </div>
    </div>
  );
}
