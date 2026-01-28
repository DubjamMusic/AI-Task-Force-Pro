import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Mock data - In production, this would fetch from a database
    const agents: Record<string, any> = {
      '1': {
        id: '1',
        name: 'Synth Coder',
        status: 'active',
        type: 'coding',
        xp: 1250,
        level: 5,
        tasksCompleted: 42,
        createdAt: new Date('2026-01-15').toISOString(),
        skills: ['React', 'TypeScript', 'Node.js'],
        currentTask: 'Building authentication system',
      },
      '2': {
        id: '2',
        name: 'Codex Operator',
        status: 'idle',
        type: 'analysis',
        xp: 890,
        level: 4,
        tasksCompleted: 28,
        createdAt: new Date('2026-01-18').toISOString(),
        skills: ['Data Analysis', 'Python', 'SQL'],
        currentTask: null,
      },
    };

    const agent = agents[id];

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: agent });
  } catch (error) {
    console.error(`Error in GET /api/agents/${params.id}:`, error);
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
      const validStatuses = ['active', 'idle', 'error'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: `Status must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Mock update - In production, this would update the database
    const updatedAgent = {
      id,
      name: body.name || 'Updated Agent',
      status: body.status || 'idle',
      type: body.type || 'coding',
      xp: body.xp || 0,
      level: body.level || 1,
      tasksCompleted: body.tasksCompleted || 0,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: updatedAgent });
  } catch (error) {
    console.error(`Error in PUT /api/agents/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Mock deletion - In production, this would delete from the database
    return NextResponse.json({
      message: 'Agent deleted successfully',
      id,
    });
  } catch (error) {
    console.error(`Error in DELETE /api/agents/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
