# Copilot Instructions for AI Task Force Pro

## Project Overview

AI Task Force Pro (also known as QuestForce AI) is a SaaS platform for orchestrating AI agent workflows. The platform enables users to manage, monitor, and maximize AI agents in real-time through a gamified experience with quests, XP rewards, and subscription tiers.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: TailwindCSS 3.4
- **Linting**: ESLint with Next.js config

## Project Structure

```
/app                 # Next.js App Router pages
/components          # Reusable React components
/src                 # Additional source files and main platform components
```

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Coding Conventions

- Use TypeScript with strict typing; avoid `any` types
- Use functional components with React hooks
- Follow existing TailwindCSS patterns for styling
- Place reusable components in `/components`
- Use `'use client'` directive for client-side components
- Import paths use `@/` alias for project root (e.g., `@/components/Button`)
- Use descriptive variable and function names that reflect their purpose

### Code Style Examples

**Good TypeScript Component:**
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface DashboardProps {
  userId: string
  initialData: DashboardData
}

export function Dashboard({ userId, initialData }: DashboardProps) {
  const [data, setData] = useState(initialData)
  
  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Component content */}
    </div>
  )
}
```

**Good API Route (App Router):**
```typescript
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // API logic
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

## Payment Integration Setup

This platform uses a subscription-based pricing model. To set up payment processing:

### Recommended Payment Provider: Stripe

1. **Create a Stripe Account**
   - Sign up at [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
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
   - Create an API route at `/api/webhooks/stripe` to handle events

### Alternative: Other Payment Providers

- **PayPal**: Use `@paypal/react-paypal-js` for checkout integration
- **Paddle**: Good for handling international taxes automatically
- **LemonSqueezy**: Simplified payment processing for SaaS

## Security Best Practices

- Never commit API keys or secrets to version control
- Use environment variables for all sensitive configuration
- Validate webhook signatures to prevent spoofing
- Implement proper authentication before processing payments

## Testing

When implementing payment features:
- Use Stripe test mode and test card numbers (e.g., `4242 4242 4242 4242`)
- Test all subscription flows: signup, upgrade, downgrade, cancellation
- Verify webhook handling with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- For App Router, create the webhook handler at `app/api/webhooks/stripe/route.ts`

## Boundaries and Constraints

### What You MUST NOT Do

- **Never** commit API keys, secrets, or sensitive credentials to version control
- **Never** modify or delete files in `.git/` directory
- **Never** create or modify files outside the project directory
- **Never** disable TypeScript strict mode or use `@ts-ignore` without a detailed comment explaining why
- **Never** remove error handling from API routes
- **Never** modify `package-lock.json` directly (use `npm install` instead)
- **Never** bypass authentication checks in payment processing logic
- **Never** hardcode URLs or environment-specific values in components

### What You SHOULD Do

- **Always** validate user input before processing
- **Always** handle errors gracefully with user-friendly messages
- **Always** test components manually after making changes
- **Always** check that environment variables are properly configured before using external APIs
- **Always** follow the existing code patterns in the file you're modifying
- **Always** ensure responsive design works on mobile, tablet, and desktop
- **Always** use semantic HTML elements for accessibility

## File Organization

- **`/app`**: Next.js App Router pages and layouts (server components by default)
- **`/components`**: Shared, reusable React components
- **`/src/components`**: Platform-specific components for the AI Task Force features
- **`/app/api`**: API routes for backend functionality
- **`/public`**: Static assets like images and fonts

## Working with State Management

This project uses Zustand for state management. When adding global state:

```typescript
import { create } from 'zustand'

interface StoreState {
  count: number
  increment: () => void
}

export const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))
```

## Accessibility Guidelines

- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, etc.)
- Ensure all interactive elements are keyboard accessible
- Provide `aria-label` for icon-only buttons
- Maintain proper color contrast ratios (WCAG AA minimum)
- Test with screen readers when adding complex UI interactions
