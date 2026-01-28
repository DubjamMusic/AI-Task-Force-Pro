import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId query parameter is required' },
        { status: 400 }
      );
    }

    // Mock data - In production, this would fetch from a database
    const subscription = {
      id: 'sub_123',
      userId,
      plan: 'professional',
      status: 'active',
      maxAgents: 10,
      maxQuestsPerMonth: 100,
      features: [
        'Advanced analytics',
        'Priority support',
        'Custom workflows',
        'API access',
      ],
      billingCycle: 'monthly',
      amount: 99,
      currency: 'USD',
      currentPeriodStart: new Date('2026-01-01').toISOString(),
      currentPeriodEnd: new Date('2026-02-01').toISOString(),
      createdAt: new Date('2025-12-01').toISOString(),
    };

    return NextResponse.json({ data: subscription });
  } catch (error) {
    console.error('Error in GET /api/subscriptions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    if (!body.plan) {
      return NextResponse.json(
        { error: 'plan is required' },
        { status: 400 }
      );
    }

    // Validate plan
    const validPlans = ['starter', 'professional', 'enterprise'];
    if (!validPlans.includes(body.plan)) {
      return NextResponse.json(
        { error: `Plan must be one of: ${validPlans.join(', ')}` },
        { status: 400 }
      );
    }

    // Plan details
    const planDetails: Record<string, any> = {
      starter: {
        maxAgents: 3,
        maxQuestsPerMonth: 20,
        features: ['Basic analytics', 'Email support'],
        amount: 29,
      },
      professional: {
        maxAgents: 10,
        maxQuestsPerMonth: 100,
        features: [
          'Advanced analytics',
          'Priority support',
          'Custom workflows',
          'API access',
        ],
        amount: 99,
      },
      enterprise: {
        maxAgents: -1, // unlimited
        maxQuestsPerMonth: -1, // unlimited
        features: [
          'Enterprise analytics',
          '24/7 dedicated support',
          'Custom integrations',
          'SLA guarantee',
          'On-premise deployment',
        ],
        amount: 299,
      },
    };

    const selectedPlan = planDetails[body.plan];

    // Mock creation - In production, this would create a subscription via payment processor
    const newSubscription = {
      id: `sub_${Math.random().toString(36).substring(7)}`,
      userId: body.userId,
      plan: body.plan,
      status: 'active',
      maxAgents: selectedPlan.maxAgents,
      maxQuestsPerMonth: selectedPlan.maxQuestsPerMonth,
      features: selectedPlan.features,
      billingCycle: body.billingCycle || 'monthly',
      amount: selectedPlan.amount,
      currency: 'USD',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newSubscription }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/subscriptions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
