import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    // Mock data - In production, this would fetch from a database
    const workflows = [
      {
        id: 'w1',
        name: 'CI/CD Pipeline',
        description: 'Automated continuous integration and deployment workflow',
        category: 'deployment',
        steps: 5,
        estimatedDuration: '15 minutes',
        popularity: 95,
        createdAt: new Date('2026-01-20').toISOString(),
      },
      {
        id: 'w2',
        name: 'Code Review Automation',
        description: 'Automated code review with AI suggestions',
        category: 'development',
        steps: 3,
        estimatedDuration: '5 minutes',
        popularity: 88,
        createdAt: new Date('2026-01-22').toISOString(),
      },
      {
        id: 'w3',
        name: 'Data Pipeline ETL',
        description: 'Extract, transform, and load data workflow',
        category: 'data',
        steps: 7,
        estimatedDuration: '30 minutes',
        popularity: 76,
        createdAt: new Date('2026-01-25').toISOString(),
      },
    ];

    let filteredWorkflows = workflows;

    if (category) {
      filteredWorkflows = workflows.filter((wf) => wf.category === category);
    }

    return NextResponse.json({
      data: filteredWorkflows,
      total: filteredWorkflows.length,
    });
  } catch (error) {
    console.error('Error in GET /api/workflows:', error);
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

    if (!body.category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    if (!body.steps || !Array.isArray(body.steps)) {
      return NextResponse.json(
        { error: 'Steps array is required' },
        { status: 400 }
      );
    }

    // Mock creation - In production, this would insert into a database
    const newWorkflow = {
      id: `w${Math.random().toString(36).substring(7)}`,
      name: body.name,
      description: body.description || '',
      category: body.category,
      steps: body.steps.length,
      estimatedDuration: body.estimatedDuration || 'Unknown',
      popularity: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newWorkflow }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/workflows:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
