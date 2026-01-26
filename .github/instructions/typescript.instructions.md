# TypeScript Code Instructions

These instructions apply when working with TypeScript files (`.ts`, `.tsx`) in this project.

## TypeScript Configuration

This project uses TypeScript in strict mode with the following key settings:

- `strict: true` - All strict type-checking options enabled
- `noEmit: true` - Type checking only, no JS output (Next.js handles compilation)
- `esModuleInterop: true` - Better compatibility with CommonJS modules
- Path alias: `@/*` maps to project root

## Type Safety Best Practices

### Use Proper Types, Not `any`

**Bad:**
```typescript
function processData(data: any) {
  return data.value
}
```

**Good:**
```typescript
interface DataInput {
  value: string
  metadata?: Record<string, unknown>
}

function processData(data: DataInput): string {
  return data.value
}
```

### Use Interfaces for Object Shapes

**Good:**
```typescript
interface Agent {
  id: string
  name: string
  status: 'active' | 'idle' | 'error'
  createdAt: Date
  metadata?: Record<string, string>
}

interface AgentResponse {
  agent: Agent
  timestamp: number
}
```

### Use Type for Unions and Primitives

```typescript
type Status = 'active' | 'idle' | 'error'
type AgentId = string
type Callback = (id: string) => void
```

### Use Generics for Reusable Code

```typescript
interface ApiResponse<T> {
  data: T
  error?: string
  timestamp: number
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url)
  return response.json()
}

// Usage
const agents = await fetchData<Agent[]>('/api/agents')
```

### Proper Function Type Definitions

```typescript
// Function declaration
function calculateXP(difficulty: string, status: string): number {
  // ...
}

// Arrow function
const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
  // ...
}

// Async function
async function fetchAgent(id: string): Promise<Agent> {
  // ...
}

// Function type
type EventHandler = (id: string) => void

interface ComponentProps {
  onAction: EventHandler
}
```

### React Component Props

**Always define prop interfaces:**

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  onClick,
  children 
}: ButtonProps) {
  // ...
}
```

### Type Guards

Use type guards for narrowing types:

```typescript
interface ErrorResponse {
  error: string
}

interface SuccessResponse {
  data: Agent[]
}

type ApiResult = ErrorResponse | SuccessResponse

function isErrorResponse(result: ApiResult): result is ErrorResponse {
  return 'error' in result
}

// Usage
if (isErrorResponse(result)) {
  console.error(result.error)
} else {
  console.log(result.data)
}
```

### Utility Types

Leverage TypeScript utility types:

```typescript
// Partial - all properties optional
type PartialAgent = Partial<Agent>

// Pick - select specific properties
type AgentBasic = Pick<Agent, 'id' | 'name'>

// Omit - exclude specific properties
type AgentWithoutId = Omit<Agent, 'id'>

// Required - make all properties required
type RequiredAgent = Required<Agent>

// Record - create object type with specific keys and value type
type AgentStatusMap = Record<string, Status>
```

## Null and Undefined Handling

### Optional Properties

```typescript
interface User {
  id: string
  name: string
  email?: string  // Optional, can be undefined
  avatar: string | null  // Can be null
}
```

### Null Checks

```typescript
function getUserEmail(user: User): string {
  // Safe access with optional chaining
  return user.email ?? 'No email provided'
}

// Nullish coalescing
const displayName = user.name ?? 'Anonymous'
```

### Non-null Assertion (Use Sparingly)

```typescript
// Only use when you're absolutely certain the value is not null
const element = document.getElementById('root')!
```

## Async/Await and Promises

```typescript
// Typed async function
async function fetchAgents(): Promise<Agent[]> {
  try {
    const response = await fetch('/api/agents')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: ApiResponse<Agent[]> = await response.json()
    return data.data
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch error:', error.message)
    }
    throw error
  }
}
```

## Error Handling

```typescript
// Use specific error types
class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Type-safe error handling
try {
  // ...
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  } else if (error instanceof Error) {
    // Handle generic error
  } else {
    // Handle unknown error
    console.error('Unknown error:', error)
  }
}
```

## Enums vs Union Types

**Prefer union types over enums in most cases:**

```typescript
// Union type (preferred)
type AgentStatus = 'active' | 'idle' | 'error'

// Enum (use only when you need the reverse mapping)
enum AgentPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}
```

## What You MUST DO with TypeScript

- **Always** use explicit types for function parameters and return values
- **Always** define interfaces for object structures
- **Always** handle null/undefined cases explicitly
- **Always** use type guards for narrowing types
- **Always** prefer `interface` for object shapes, `type` for unions
- **Always** use `const` for values that don't change
- **Always** enable and respect TypeScript errors (don't ignore them)

## What You MUST NOT DO with TypeScript

- **Never** use `any` unless absolutely necessary (and document why)
- **Never** use `@ts-ignore` without a detailed comment
- **Never** disable strict mode
- **Never** use type assertion (`as`) to bypass type checking
- **Never** leave unused variables or imports
- **Never** use `var` (use `const` or `let`)
- **Never** ignore TypeScript errors in development

## Type Checking Commands

- Run `npm run type-check` to check for type errors
- Run `npm run lint` to check for linting issues (includes some type checks)
- Configure your IDE to show TypeScript errors inline
