# Copilot Instructions for AI Task Force Pro

## Project Overview

AI Task Force Pro (also known as QuestForce AI) is a SaaS platform for orchestrating AI agent workflows. The platform enables users to manage, monitor, and maximize AI agents in real-time through a gamified experience with quests, XP rewards, and subscription tiers.

## Tech Stack

- **Framework**: Next.js 15.1.4 with App Router
- **Language**: TypeScript 5 with strict mode enabled
- **UI Library**: React 18.3.1
- **Styling**: TailwindCSS 3.4.1 with custom configuration
- **State Management**: Zustand 4.5.0
- **UI Components**: Radix UI primitives (@radix-ui/*)
- **Animations**: Framer Motion 11.0.3
- **Charts**: Recharts 2.10.3
- **Icons**: Lucide React 0.344.0
- **Linting**: ESLint 8 with Next.js config
- **Formatting**: Prettier 3.2.4 with Tailwind plugin

## Project Structure

```
/app                          # Next.js App Router pages and layouts
  ├── globals.css             # Global styles
  ├── layout.tsx              # Root layout component
  └── page.tsx                # Home/main page
/components                   # Reusable React components
  ├── AIChat.tsx              # AI chat interface component
  ├── AgentNetwork.tsx        # Agent network visualization
  ├── GamificationStats.tsx   # Gamification stats display
  ├── PricingPlans.tsx        # Pricing tiers component
  └── WorkflowTemplates.tsx   # Workflow templates interface
/src                          # Additional platform components and legacy code
  ├── App.tsx                 # Legacy app entry point
  ├── QuestForcePlatform.jsx  # Main platform component (JSX - legacy)
  ├── components/             # Additional components
  └── main.tsx                # Legacy main entry
/.github                      # GitHub configuration
  └── copilot-instructions.md # This file
```

## Development Commands

```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production (outputs to .next/)
npm run start        # Start production server
npm run lint         # Run ESLint checks
npm run type-check   # Run TypeScript type checking without emitting files
npm run format       # Format code with Prettier
npm run analyze      # Analyze bundle size with Next.js bundle analyzer
```

## Coding Conventions

### General Guidelines
- Use TypeScript with strict typing; avoid `any` types unless absolutely necessary
- Prefer `unknown` over `any` when type is truly unknown
- Use functional components with React hooks exclusively
- Follow existing TailwindCSS utility-first patterns for styling
- Place reusable components in `/components` directory
- Use `'use client'` directive for client-side components in App Router
- Implement proper error boundaries for component error handling
- Use proper TypeScript types/interfaces; export types when shared

### File Organization
- TypeScript files use `.tsx` extension for components, `.ts` for utilities
- One component per file; prefer named exports for better tree shaking
- Group related utilities in the same file
- Import order: React/Next, third-party libraries, local components, utilities, types
- Use path aliases with `@/*` notation (e.g., `@/components/Button`)

### Naming Conventions
- Components: PascalCase (e.g., `AgentNetwork.tsx`, `AIChat.tsx`)
- Hooks: camelCase starting with `use` (e.g., `useAgentData`)
- Utilities/functions: camelCase (e.g., `formatCurrency`, `calculateXP`)
- Types/Interfaces: PascalCase (e.g., `Agent`, `QuestData`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_AGENTS`, `API_BASE_URL`)

### React Patterns
- Use hooks for state and side effects (`useState`, `useEffect`, `useCallback`, etc.)
- Memoize expensive computations with `useMemo`
- Memoize callbacks passed to child components with `useCallback`
- Extract custom hooks for reusable logic
- Use proper dependency arrays in `useEffect` and `useCallback`

### Styling
- Use Tailwind utility classes; avoid inline styles or CSS modules
- Follow mobile-first responsive design (start with mobile, add `md:`, `lg:` breakpoints)
- Use Tailwind's dark mode classes (`dark:*`) for dark theme support
- Maintain consistent spacing scale (use `p-4`, `m-2`, etc.)
- Use gradient utilities for backgrounds (`bg-gradient-to-br`)
- Leverage class-variance-authority (CVA) and clsx for conditional classes

## Boundaries and Exclusions

### DO NOT Modify
- **Generated files**: `.next/`, `node_modules/`, build artifacts
- **Configuration lock files**: `package-lock.json` (unless adding/updating dependencies)
- **Git metadata**: `.git/`, `.gitignore` (unless explicitly required)
- **Environment files**: `.env`, `.env.local`, `.env.production` (document structure only)

### Proceed with Caution
- **Core configuration files**: `next.config.js`, `tsconfig.json`, `tailwind.config.ts` (only modify if essential)
- **Package.json**: Only add dependencies when necessary; prefer using existing libraries
- **Root layout**: `app/layout.tsx` (changes affect entire application)

## Dependency Management

### Adding Dependencies
- **ALWAYS** check if existing dependencies can solve the problem before adding new ones
- Prefer well-maintained, popular packages with TypeScript support
- Check package version compatibility with Next.js 15 and React 18
- Add peer dependencies if required
- Run `npm install <package>` to add production dependencies
- Run `npm install -D <package>` to add dev dependencies

### Current Key Dependencies
- UI: Radix UI components, Framer Motion for animations
- State: Zustand (lightweight state management)
- Visualization: Recharts for charts, ReactFlow for node graphs
- Utilities: date-fns, nanoid, clsx, tailwind-merge, class-variance-authority (CVA)

## Testing Guidelines

### Testing Strategy
- Currently, the project does not have a formal test suite
- When adding tests, use Jest and React Testing Library
- Focus on critical user flows: agent orchestration, quest creation, pricing interaction
- Test component rendering and user interactions
- Mock external API calls and services

### Test File Naming
- Place tests adjacent to components: `ComponentName.test.tsx`
- Or in a `__tests__` directory: `__tests__/ComponentName.test.tsx`

## Payment Integration Setup

This platform uses a subscription-based pricing model. Payment integration is **NOT YET IMPLEMENTED**.

### Recommended Payment Provider: Stripe

When implementing payment features:

1. **Create a Stripe Account**
   - Sign up at https://dashboard.stripe.com/register
   - Complete business verification for production use

2. **Obtain API Keys**
   - Navigate to Developers > API Keys in Stripe Dashboard
   - Copy your **Publishable key** (starts with `pk_`)
   - Copy your **Secret key** (starts with `sk_`)

3. **Environment Variables**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. **Install Stripe SDK**
   ```bash
   npm install stripe@^14.0.0 @stripe/stripe-js@^3.0.0 @stripe/react-stripe-js@^2.0.0
   ```

5. **Create Stripe Products**
   Set up products in Stripe Dashboard matching the pricing tiers:
   - Starter: $29/month or $290/year
   - Professional: $99/month or $990/year
   - Enterprise: $299/month or $2990/year

6. **Webhook Configuration**
   - Set up webhooks at Developers > Webhooks
   - Listen for events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Create an API route at `app/api/webhooks/stripe/route.ts` to handle events

### Alternative Payment Providers
- **PayPal**: Use `@paypal/react-paypal-js` for checkout integration
- **Paddle**: Good for handling international taxes automatically
- **LemonSqueezy**: Simplified payment processing for SaaS

## Security Best Practices

- **NEVER** commit API keys, secrets, or credentials to version control
- Use environment variables for all sensitive configuration
- Validate webhook signatures to prevent spoofing
- Implement proper authentication before processing payments
- Sanitize user inputs to prevent XSS attacks
- Use HTTPS in production
- Implement rate limiting for API routes
- Keep dependencies updated to patch security vulnerabilities

## Example Code Patterns

### Component Example
```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface AgentCardProps {
  name: string;
  status: 'active' | 'idle' | 'error';
  onActivate: (id: string) => void;
}

const STATUS_STYLES = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  idle: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
} as const;

export function AgentCard({ name, status, onActivate }: AgentCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onActivate(name);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold">{name}</h3>
      <span className={`inline-block px-2 py-1 rounded text-sm ${STATUS_STYLES[status]}`}>
        {status}
      </span>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Activating...' : 'Activate'}
      </Button>
    </div>
  );
}
```

### API Route Example (App Router)
```typescript
// app/api/agents/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Fetch agents logic
    const agents = await fetchAgents();
    return NextResponse.json({ agents }, { status: 200 });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate and create agent
    const agent = await createAgent(body);
    return NextResponse.json({ agent }, { status: 201 });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}
```

## Common Tasks

### Adding a New Component
1. Create file in `/components` with PascalCase name
2. Use `'use client'` if it uses hooks or client-side features
3. Define proper TypeScript interfaces for props
4. Use Tailwind for styling
5. Prefer named exports for better tree shaking and refactoring

### Adding a New Page (App Router)
1. Create file/folder in `/app` directory
2. Export default component from `page.tsx`
3. Use `layout.tsx` for shared layouts
4. Add metadata export for SEO
5. Use proper loading and error boundaries

### Updating Styles
1. Prefer Tailwind utility classes
2. Check if existing components/patterns can be reused
3. Ensure responsive design with breakpoints
4. Test in both light and dark modes
5. Maintain consistency with existing design system

## Additional Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 18 Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

## Notes for Copilot

- This is a **front-end focused** SaaS platform without a backend API implemented yet
- The `/src` directory contains legacy code that may be migrated to the App Router
- Focus on creating reusable, performant, and accessible components
- Prioritize TypeScript type safety and proper error handling
- When in doubt about patterns, check existing components for reference
- The platform emphasizes gamification: quests, XP, rewards - keep this theme consistent
