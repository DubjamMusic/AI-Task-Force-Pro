# API Routes Instructions

These instructions apply when working with files in `/app/api/**/*.ts`.

## Next.js 15 App Router API Routes

API routes in Next.js 15 App Router are defined in `route.ts` files within the `/app/api` directory.

### Route Handler Structure

Each route handler exports named functions for HTTP methods:

```typescript
import { NextRequest, NextResponse } from 'next/server'

// GET /api/agents
export async function GET(request: NextRequest) {
  try {
    // Query parameters
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    
    // Your logic here
    const data = await fetchData(status)
    
    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/agents:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/agents
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    
    // Your logic here
    const result = await createAgent(body)
    
    return NextResponse.json({ data: result }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/agents:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Dynamic Routes

For dynamic segments like `/api/agents/[id]`:

```typescript
// app/api/agents/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  
  // Your logic here
  const agent = await getAgentById(id)
  
  if (!agent) {
    return NextResponse.json(
      { error: 'Agent not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({ data: agent })
}
```

## Security Requirements

### Authentication

- **Always** verify user authentication before processing sensitive operations
- Use session tokens or JWT for authentication
- Return 401 Unauthorized for unauthenticated requests
- Return 403 Forbidden for authenticated but unauthorized requests

### Input Validation

- **Always** validate all input data
- Check for required fields
- Validate data types and formats
- Sanitize user input to prevent injection attacks
- Return 400 Bad Request with clear error messages for invalid input

### Error Handling

- **Always** wrap route handlers in try-catch blocks
- Log errors for debugging but don't expose internal details to clients
- Return appropriate HTTP status codes
- Use consistent error response format

```typescript
// Good error response format
{
  error: 'User-friendly error message',
  code: 'ERROR_CODE' // optional
}
```

## CORS and Headers

If your API needs CORS, configure it properly:

```typescript
export async function GET(request: NextRequest) {
  const response = NextResponse.json({ data: 'response' })
  
  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  
  return response
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

## Testing API Routes

Test API routes by creating mock requests:

```typescript
import { GET } from '@/app/api/agents/route'
import { NextRequest } from 'next/server'

describe('GET /api/agents', () => {
  it('returns agents list', async () => {
    const request = new NextRequest('http://localhost:3000/api/agents')
    const response = await GET(request)
    
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data.agents)).toBe(true)
  })
})
```

## Rate Limiting

For production APIs, consider implementing rate limiting:

```typescript
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const identifier = request.ip ?? 'anonymous'
  
  const { success } = await rateLimit.check(identifier)
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }
  
  // Your logic here
}
```

## What You MUST DO in API Routes

- **Always** use try-catch for error handling
- **Always** validate input data
- **Always** return appropriate HTTP status codes
- **Always** log errors for debugging
- **Always** sanitize user input
- **Always** use TypeScript types for request/response
- **Always** document expected request/response format

## What You MUST NOT DO in API Routes

- **Never** expose sensitive error details to clients
- **Never** trust user input without validation
- **Never** hardcode secrets or API keys
- **Never** skip authentication for protected routes
- **Never** return 200 for errors
- **Never** forget to handle edge cases
- **Never** commit API keys or secrets in environment examples
