import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const difficulty = searchParams.get('difficulty');

    // Mock data - In production, this would fetch from a database
    const quests = [
      {
        id: 'q1',
        title: 'Deploy Microservice',
        description: 'Deploy a new microservice to the production cluster',
        status: 'active',
        difficulty: 'medium',
        xpReward: 500,
        estimatedTime: '2 hours',
        assignedAgents: ['1'],
        progress: 65,
        createdAt: new Date('2026-01-28').toISOString(),
      },
      {
        id: 'q2',
        title: 'Code Review Sprint',
        description: 'Review and approve 10 pull requests',
        status: 'completed',
        difficulty: 'easy',
        xpReward: 200,
        estimatedTime: '1 hour',
        assignedAgents: ['2'],
        progress: 100,
        createdAt: new Date('2026-01-27').toISOString(),
        completedAt: new Date('2026-01-27').toISOString(),
      },
      {
        id: 'q3',
        title: 'Implement Real-time Analytics',
        description: 'Build a real-time analytics dashboard with WebSocket support',
        status: 'pending',
        difficulty: 'hard',
        xpReward: 1000,
        estimatedTime: '6 hours',
        assignedAgents: [],
        progress: 0,
        createdAt: new Date('2026-01-28').toISOString(),
      },
    ];

    let filteredQuests = quests;

    if (status) {
      filteredQuests = filteredQuests.filter((quest) => quest.status === status);
    }

    if (difficulty) {
      filteredQuests = filteredQuests.filter(
        (quest) => quest.difficulty === difficulty
      );
    }

    return NextResponse.json({
      data: filteredQuests,
      total: filteredQuests.length,
    });
  } catch (error) {
    console.error('Error in GET /api/quests:', error);
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
    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!body.description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    if (!body.difficulty) {
      return NextResponse.json(
        { error: 'Difficulty is required' },
        { status: 400 }
      );
    }

    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(body.difficulty)) {
      return NextResponse.json(
        { error: `Difficulty must be one of: ${validDifficulties.join(', ')}` },
        { status: 400 }
      );
    }

    // Mock creation - In production, this would insert into a database
    const newQuest = {
      id: `q${Math.random().toString(36).substring(7)}`,
      title: body.title,
      description: body.description,
      status: 'pending',
      difficulty: body.difficulty,
      xpReward: body.xpReward || 100,
      estimatedTime: body.estimatedTime || '1 hour',
      assignedAgents: body.assignedAgents || [],
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newQuest }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/quests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
