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
