import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') || '10';

    // Mock data - In production, this would fetch from a database
    const agents = [
      {
        id: '1',
        name: 'Synth Coder',
        status: 'active',
        type: 'coding',
        xp: 1250,
        level: 5,
        tasksCompleted: 42,
        createdAt: new Date('2026-01-15').toISOString(),
      },
      {
        id: '2',
        name: 'Codex Operator',
        status: 'idle',
        type: 'analysis',
        xp: 890,
        level: 4,
        tasksCompleted: 28,
        createdAt: new Date('2026-01-18').toISOString(),
      },
      {
        id: '3',
        name: 'Shaltz Envoy',
        status: 'active',
        type: 'deployment',
        xp: 2100,
        level: 7,
        tasksCompleted: 67,
        createdAt: new Date('2026-01-10').toISOString(),
      },
    ];

    let filteredAgents = agents;
    if (status) {
      filteredAgents = agents.filter((agent) => agent.status === status);
    }

    const limitedAgents = filteredAgents.slice(0, parseInt(limit));

    return NextResponse.json({
      data: limitedAgents,
      total: filteredAgents.length,
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error('Error in GET /api/agents:', error);
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
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!body.type) {
      return NextResponse.json(
        { error: 'Type is required' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['coding', 'analysis', 'deployment', 'testing'];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { error: `Type must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Mock creation - In production, this would insert into a database
    const newAgent = {
      id: Math.random().toString(36).substring(7),
      name: body.name,
      status: 'idle',
      type: body.type,
      xp: 0,
      level: 1,
      tasksCompleted: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newAgent }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/agents:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
