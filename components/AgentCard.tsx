'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AgentCardProps {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error';
  description?: string;
  onAction?: (id: string) => void;
}

const statusConfig = {
  active: {
    color: 'bg-green-500',
    textColor: 'text-green-600',
    bgGradient: 'from-green-500/20 to-emerald-500/20',
    label: 'Active',
  },
  idle: {
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    bgGradient: 'from-yellow-500/20 to-amber-500/20',
    label: 'Idle',
  },
  error: {
    color: 'bg-red-500',
    textColor: 'text-red-600',
    bgGradient: 'from-red-500/20 to-rose-500/20',
    label: 'Error',
  },
};

export default function AgentCard({
  id,
  name,
  status,
  description,
  onAction,
}: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
      role="article"
      aria-label={`Agent card for ${name}`}
    >
      {/* Gradient background overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-50 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-50'
        }`}
      />

      {/* Glassmorphism effect */}
      <div className="relative backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 p-6 border border-gray-200/50 dark:border-gray-700/50">
        {/* Status indicator and ID */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: status === 'active' ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: status === 'active' ? Infinity : 0,
              }}
              className={`w-3 h-3 ${config.color} rounded-full shadow-lg`}
              aria-hidden="true"
            />
            <span
              className={`text-sm font-semibold ${config.textColor} dark:opacity-90`}
              aria-label={`Status: ${config.label}`}
            >
              {config.label}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            ID: {id.slice(0, 8)}...
          </span>
        </div>

        {/* Agent name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
          {name}
        </h3>

        {/* Description - shown on hover or if provided */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered && description ? 'auto' : 0,
            opacity: isHovered && description ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {description}
            </p>
          )}
        </motion.div>

        {/* Agent icon/avatar */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Additional info on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-2 mb-4"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Performance</span>
            <div className="flex items-center gap-1">
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? '75%' : 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                75%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action button */}
        {onAction && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAction(id);
            }}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label={`View details for ${name}`}
          >
            View Details
          </motion.button>
        )}
      </div>

      {/* Shine effect on hover */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '200%' : '-100%' }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        style={{ transform: 'skewX(-20deg)' }}
      />
    </motion.div>
  );
}
