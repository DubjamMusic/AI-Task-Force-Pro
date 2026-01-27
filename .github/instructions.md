# GitHub Copilot Instructions for AI Task Force Pro

This repository is the **AI Task Force Pro** platform, orchestrated with **HustleCodex** character archetypes. It is a modern web application built with **Next.js 15**, **React 18**, **TypeScript**, and **Tailwind CSS**.

## 🛠 Tech Stack & Patterns

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with `lucide-react` for icons.
- **Animations**: `framer-motion` for fluid UI transitions.
- **State Management**: `zustand` for global state.
- **UI Components**: Radix UI primitives and custom Tailwind-styled components.
- **Visualizations**: `recharts` for data and `reactflow` for workflow diagrams.

## 🎨 Coding Standards

1. **Component Structure**:
   - Use `'use client'` directive for interactive components.
   - Prefer functional components with TypeScript interfaces for props.
   - Use Tailwind CSS for all styling; avoid external CSS files where possible (unless following existing patterns in `src/components`).

2. **Archetypes & Branding**:
   - Follow the **HustleCodex** branding: Synth Coder, Codex Operator, and Shaltz Envoy.
   - Maintain the "Cyberpunk/Professional" aesthetic: high contrast, gradients (e.g., `from-blue-600 to-purple-600`), and dark mode support.

3. **TypeScript**:
   - Ensure strict typing for all hooks, states, and event handlers.
   - Use descriptive interface names (e.g., `Message`, `AgentConfig`).

4. **Best Practices**:
   - Use `clsx` and `tailwind-merge` for conditional class management.
   - Implement responsive design by default using Tailwind's breakpoints.
   - Prioritize accessibility by using Radix UI primitives.

## 🚀 Workflow

- When creating new components, place them in `/components` (for global/shared) or `src/components` (for feature-specific).
- Follow the existing simulation patterns for AI interactions (as seen in `AIChat.tsx`).
- Ensure all new features align with the "Orchestrated AI Workforce" theme.
