import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Mock data - In production, this would fetch from a database
    const quest = {
      id,
      title: 'Deploy Microservice',
      description: 'Deploy a new microservice to the production cluster',
      status: 'active',
      difficulty: 'medium',
      xpReward: 500,
      estimatedTime: '2 hours',
      assignedAgents: ['1'],
      progress: 65,
      createdAt: new Date('2026-01-28').toISOString(),
      tasks: [
        { id: 't1', name: 'Setup environment', completed: true },
        { id: 't2', name: 'Build Docker image', completed: true },
        { id: 't3', name: 'Deploy to staging', completed: false },
        { id: 't4', name: 'Run integration tests', completed: false },
      ],
    };

    return NextResponse.json({ data: quest });
  } catch (error) {
    console.error(`Error in GET /api/quests/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate status if provided
    if (body.status) {
      const validStatuses = ['pending', 'active', 'completed', 'failed'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: `Status must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Validate progress if provided
    if (body.progress !== undefined) {
      if (typeof body.progress !== 'number' || body.progress < 0 || body.progress > 100) {
        return NextResponse.json(
          { error: 'Progress must be a number between 0 and 100' },
          { status: 400 }
        );
      }
    }

    // Mock update - In production, this would update the database
    const updatedQuest = {
      id,
      status: body.status || 'active',
      progress: body.progress ?? 0,
      assignedAgents: body.assignedAgents || [],
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: updatedQuest });
  } catch (error) {
    console.error(`Error in PUT /api/quests/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
