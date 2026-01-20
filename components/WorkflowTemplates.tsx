'use client';

import { useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  rating: number;
  downloads: number;
  category: string;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Data Analysis Pipeline',
    description: 'Automated data cleaning, analysis, and visualization workflow',
    difficulty: 'Medium',
    xpReward: 250,
    rating: 4.8,
    downloads: 1243,
    category: 'Analytics',
  },
  {
    id: '2',
    name: 'Content Generation',
    description: 'Generate blog posts, social media content, and marketing copy',
    difficulty: 'Easy',
    xpReward: 150,
    rating: 4.6,
    downloads: 2156,
    category: 'Content',
  },
  {
    id: '3',
    name: 'Code Review Assistant',
    description: 'Automated code review with security and best practice checks',
    difficulty: 'Hard',
    xpReward: 500,
    rating: 4.9,
    downloads: 892,
    category: 'Development',
  },
  {
    id: '4',
    name: 'Customer Support Bot',
    description: 'AI-powered customer service with ticket routing and responses',
    difficulty: 'Medium',
    xpReward: 300,
    rating: 4.7,
    downloads: 1567,
    category: 'Support',
  },
  {
    id: '5',
    name: 'Image Processing',
    description: 'Batch image optimization, resizing, and format conversion',
    difficulty: 'Easy',
    xpReward: 100,
    rating: 4.5,
    downloads: 3421,
    category: 'Media',
  },
  {
    id: '6',
    name: 'ML Model Training',
    description: 'Complete machine learning pipeline from data to deployment',
    difficulty: 'Hard',
    xpReward: 750,
    rating: 5.0,
    downloads: 634,
    category: 'ML/AI',
  },
];

export default function WorkflowTemplates() {
  const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [clonedTemplates, setClonedTemplates] = useState<Set<string>>(new Set());

  const filteredTemplates = filter === 'All' 
    ? templates 
    : templates.filter(t => t.difficulty === filter);

  const handleClone = (templateId: string) => {
    setClonedTemplates(prev => new Set(prev).add(templateId));
    // Simulate cloning delay
    setTimeout(() => {
      setClonedTemplates(prev => {
        const newSet = new Set(prev);
        newSet.delete(templateId);
        return newSet;
      });
    }, 2000);
  };

  const getDifficultyColor = (difficulty: Template['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Browse AI Workflow Templates
        </h2>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === level
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => {
          const isCloning = clonedTemplates.has(template.id);
          
          return (
            <div
              key={template.id}
              className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all hover:scale-105"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex-1">
                  {template.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(template.difficulty)}`}>
                  {template.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {template.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center space-x-4">
                  {/* Rating */}
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {template.rating}
                    </span>
                  </div>

                  {/* Downloads */}
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      {template.downloads.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* XP Reward */}
              <div className="mb-4 flex items-center bg-purple-100 dark:bg-purple-900 rounded-lg p-2">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-200">
                  +{template.xpReward} XP Reward
                </span>
              </div>

              {/* Clone Button */}
              <button
                onClick={() => handleClone(template.id)}
                disabled={isCloning}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                  isCloning
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isCloning ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Cloning...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Clone Template
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
