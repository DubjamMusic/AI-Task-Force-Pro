# GitHub Copilot Instructions for AI Task Force Pro

This repository is the **AI Task Force Pro** platform, orchestrated with **HustleCodex** character archetypes. It is a modern web application built with **Next.js 15**, **React 18**, **TypeScript**, and **Tailwind CSS**.

## 🛠 Tech Stack & Patterns

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4 with `lucide-react` for icons
- **Animations**: `framer-motion` for fluid UI transitions
- **State Management**: `zustand` for global state
- **UI Components**: Radix UI primitives (`@radix-ui/react-*`) and custom Tailwind-styled components
- **Visualizations**: `recharts` for data charts and `reactflow` for workflow diagrams
- **Additional Libraries**: 
  - `clsx` and `tailwind-merge` for conditional class management
  - `class-variance-authority` for component variants
  - `sonner` for toast notifications
  - `date-fns` for date formatting
  - `nanoid` for unique ID generation
  - `canvas-confetti` for celebration effects

## 🎨 Coding Standards

### 1. Component Structure

- **Always** use `'use client'` directive for interactive components
- **Always** use functional components with TypeScript interfaces for props
- **Always** use Tailwind CSS for styling; avoid external CSS files where possible (unless following existing patterns in `src/components`)
- **Never** use inline styles; leverage Tailwind's utility classes

**Example Component Pattern:**
```typescript
'use client';

import { useState } from 'react';

interface AgentCardProps {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'processing';
  onStatusChange?: (id: string, status: string) => void;
}

export default function AgentCard({ id, name, status, onStatusChange }: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const statusColors = {
    active: 'bg-green-500',
    idle: 'bg-gray-500',
    processing: 'bg-blue-500',
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
      </div>
    </div>
  );
}
```

### 2. Archetypes & Branding (HustleCodex)

Follow the **HustleCodex** character archetype system:

- **Synth Coder**: The technical architect, focuses on code generation and optimization
- **Codex Operator**: The workflow orchestrator, manages agent coordination and task execution
- **Shaltz Envoy**: The communication specialist, handles user interactions and reporting

Maintain the **"Cyberpunk/Professional"** aesthetic:

- **High Contrast**: Use dark backgrounds with vibrant accents
- **Signature Gradients**: `from-blue-600 to-purple-600`, `from-purple-500 to-blue-600`
- **Dark Mode Support**: Always include `dark:` variants for Tailwind classes
- **Glowing Effects**: Use subtle shadows and pulse animations for active states
- **Neon Accents**: Blue, purple, and pink hues for CTAs and highlights

**Design Pattern Examples:**
```typescript
// Hero Section
<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white">
  <h2 className="text-4xl font-bold mb-2">Your AI Workforce, Orchestrated</h2>
  <p className="text-xl opacity-90">
    Manage, monitor, and maximize your AI agents in real-time
  </p>
</div>

// Navigation Button (Active State)
<button className="bg-blue-600 text-white shadow-lg scale-105 px-3 py-2 rounded-md">
  Dashboard
</button>

// Card with Gradient Background
<div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
  {/* Content */}
</div>

// Status Indicator with Pulse
<span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>

// User Avatar with Gradient
<div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
  U
</div>
```

### 3. TypeScript Best Practices

- **Always** use strict typing; **never** use `any` types
- **Always** define interfaces for component props and data structures
- **Always** use descriptive interface names (e.g., `Message`, `AgentConfig`, `UserStats`)
- Use union types for status fields: `'active' | 'idle' | 'processing'`

**Common Interface Patterns:**
```typescript
interface Agent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'processing';
  task: string;
  progress: number;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface UserStats {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  rank: string;
  totalWorkflows: number;
  completedTasks: number;
}

interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  highlighted?: boolean;
}
```

### 4. Best Practices

- **Always** use `clsx` and `tailwind-merge` for conditional class management
- **Always** implement responsive design using Tailwind's breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- **Always** prioritize accessibility by using Radix UI primitives
- **Always** handle loading and error states in components
- **Always** use semantic HTML elements (`<nav>`, `<main>`, `<section>`, etc.)

**Conditional Classes Example:**
```typescript
import { clsx } from 'clsx';

<button
  className={clsx(
    'px-6 py-2 rounded-lg font-semibold transition-all',
    isActive 
      ? 'bg-blue-600 text-white shadow-lg' 
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  )}
>
  {label}
</button>
```

### 5. Animation Patterns

Use `framer-motion` for smooth transitions:

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white dark:bg-gray-800 rounded-lg p-6"
>
  {/* Content */}
</motion.div>
```

### 6. Real-time Simulation Patterns

Follow the existing patterns for simulating real-time AI interactions:

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setAgents(prevAgents =>
      prevAgents.map(agent => ({
        ...agent,
        progress: agent.status === 'active'
          ? Math.min(100, agent.progress + Math.random() * 5)
          : agent.progress,
      }))
    );
  }, 2000);

  return () => clearInterval(interval);
}, []);
```

## 🚀 Workflow

### Component Organization

- **`/components`**: Shared, reusable components (e.g., `AgentNetwork.tsx`, `PricingPlans.tsx`, `AIChat.tsx`)
- **`/src/components`**: Feature-specific components (e.g., `Sidebar.tsx`, `QuestGallery.tsx`)
- **`/app`**: Next.js App Router pages and layouts
- **`/app/api`**: API routes for backend functionality

### Creating New Components

1. **Determine location**: Global/shared → `/components`, Feature-specific → `/src/components`
2. **Follow naming convention**: PascalCase for files (e.g., `AgentNetwork.tsx`)
3. **Use TypeScript interfaces**: Define props and state types
4. **Apply HustleCodex aesthetic**: Use signature gradients and dark mode support
5. **Add interactive elements**: Use Radix UI primitives for accessibility
6. **Implement responsive design**: Use Tailwind breakpoints

### Simulation Patterns

Follow existing patterns for AI interactions (reference `AIChat.tsx` and `AgentNetwork.tsx`):

- Simulate real-time updates with `setInterval`
- Use random delays for realistic agent responses
- Display loading/typing indicators
- Show progress bars for long-running tasks
- Add activity feeds for agent actions

### Gamification System

Implement XP, levels, and rewards:

- Award XP for completed workflows and tasks
- Display progress bars for level advancement
- Show rank badges (Novice → Apprentice → Expert → Master → Grandmaster)
- Use `canvas-confetti` for level-up celebrations

## 📋 Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run format       # Format code with Prettier
```

## 🔒 Security & Best Practices

- **Never** commit API keys or secrets to version control
- **Always** validate user input before processing
- **Always** handle errors gracefully with user-friendly messages
- **Always** use environment variables for configuration
- **Always** implement proper authentication for sensitive operations

## ♿ Accessibility Guidelines

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, etc.)
- Ensure all interactive elements are keyboard accessible
- Provide `aria-label` for icon-only buttons
- Maintain proper color contrast ratios (WCAG AA minimum)
- Test with screen readers when adding complex UI interactions

## 🌐 Import Path Aliases

Use the `@/` alias for imports (configured in `tsconfig.json`):

```typescript
import AgentNetwork from '@/components/AgentNetwork';
import { Button } from '@/components/ui/button';
```

## 🎯 Core Theme: "Orchestrated AI Workforce"

All features should align with the platform's core concept:

- **Orchestration**: Multiple AI agents working together
- **Monitoring**: Real-time visibility into agent status and progress
- **Gamification**: XP, levels, quests, and rewards
- **Workflow Templates**: Pre-built and custom agent workflows
- **Analytics**: Data visualization with charts and graphs
- **Subscription Tiers**: Starter, Professional, Enterprise pricing
