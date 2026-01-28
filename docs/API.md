# AI Task Force Pro API Documentation

## Overview

The AI Task Force Pro API provides a RESTful interface for managing AI agents, quests, workflows, and subscriptions. This API enables you to orchestrate AI agent workflows, track progress through gamified quests, and manage subscription tiers programmatically.

**Version:** 1.0.0  
**Base URL:** `http://localhost:3000` (development)  
**Production URL:** `https://your-domain.com` (to be configured)

## Table of Contents

- [Authentication](#authentication)
- [General API Conventions](#general-api-conventions)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [Agents](#agents)
  - [Quests](#quests)
  - [Workflows](#workflows)
  - [Subscriptions](#subscriptions)

---

## Authentication

**⚠️ Note:** Authentication is not currently implemented but should be added before production deployment.

**Recommended Implementation:**
- Use Bearer token authentication with JWT
- Include authentication token in request headers: `Authorization: Bearer <token>`
- Implement proper user authentication and authorization for all endpoints
- Add rate limiting per user/API key

**Example (Future):**
```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  http://localhost:3000/api/agents
```

---

## General API Conventions

### Request Format

- **Content-Type:** `application/json`
- **Accept:** `application/json`
- All request bodies should be valid JSON

### Response Format

All successful responses follow this structure:

```json
{
  "data": {}, // or []
  "total": 10, // Optional: for list endpoints
  "limit": 10  // Optional: for paginated endpoints
}
```

### Date/Time Format

All timestamps are in ISO 8601 format:
```
2026-01-28T12:34:56.789Z
```

### Pagination

Some endpoints support pagination through query parameters:
- `limit` - Number of items to return (default varies by endpoint)
- **Note:** Offset-based pagination will be implemented in future versions

---

## Error Handling

### Error Response Format

```json
{
  "error": "Human-readable error message"
}
```

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| `200` | Success - Request completed successfully |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid input or missing required fields |
| `404` | Not Found - Resource does not exist |
| `500` | Internal Server Error - Server encountered an error |

**Future Status Codes:**
- `401` - Unauthorized - Authentication required
- `403` - Forbidden - Insufficient permissions
- `429` - Too Many Requests - Rate limit exceeded

---

## Rate Limiting

**⚠️ Future Feature:** Rate limiting is not currently implemented but is recommended for production.

**Planned Implementation:**
- 100 requests per minute per API key/user
- Rate limit headers will be included in responses:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

---

# Endpoints

## Agents

Agents are AI entities that perform tasks and earn XP through quest completion.

### List Agents

Retrieve a list of all agents with optional filtering.

**Endpoint:** `GET /api/agents`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by agent status: `active`, `idle`, `error` |
| `limit` | integer | No | Maximum number of agents to return (default: 10) |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/agents?status=active&limit=5"
```

**Success Response (200):**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Synth Coder",
      "status": "active",
      "type": "coding",
      "xp": 1250,
      "level": 5,
      "tasksCompleted": 42,
      "createdAt": "2026-01-15T00:00:00.000Z"
    },
    {
      "id": "3",
      "name": "Shaltz Envoy",
      "status": "active",
      "type": "deployment",
      "xp": 2100,
      "level": 7,
      "tasksCompleted": 67,
      "createdAt": "2026-01-10T00:00:00.000Z"
    }
  ],
  "total": 2,
  "limit": 5
}
```

**Error Response (500):**

```json
{
  "error": "Internal server error"
}
```

---

### Create Agent

Create a new AI agent.

**Endpoint:** `POST /api/agents`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Agent name |
| `type` | string | Yes | Agent type: `coding`, `analysis`, `deployment`, `testing` |

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Neural Architect",
    "type": "coding"
  }'
```

**Success Response (201):**

```json
{
  "data": {
    "id": "abc123",
    "name": "Neural Architect",
    "status": "idle",
    "type": "coding",
    "xp": 0,
    "level": 1,
    "tasksCompleted": 0,
    "createdAt": "2026-01-28T12:34:56.789Z"
  }
}
```

**Error Responses:**

**400 - Missing Name:**
```json
{
  "error": "Name is required"
}
```

**400 - Missing Type:**
```json
{
  "error": "Type is required"
}
```

**400 - Invalid Type:**
```json
{
  "error": "Type must be one of: coding, analysis, deployment, testing"
}
```

---

### Get Agent by ID

Retrieve detailed information about a specific agent.

**Endpoint:** `GET /api/agents/{id}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique agent identifier |

**Example Request:**

```bash
curl -X GET http://localhost:3000/api/agents/1
```

**Success Response (200):**

```json
{
  "data": {
    "id": "1",
    "name": "Synth Coder",
    "status": "active",
    "type": "coding",
    "xp": 1250,
    "level": 5,
    "tasksCompleted": 42,
    "createdAt": "2026-01-15T00:00:00.000Z",
    "skills": ["React", "TypeScript", "Node.js"],
    "currentTask": "Building authentication system"
  }
}
```

**Error Response (404):**

```json
{
  "error": "Agent not found"
}
```

---

### Update Agent

Update an existing agent's properties.

**Endpoint:** `PUT /api/agents/{id}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique agent identifier |

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Updated agent name |
| `status` | string | No | Updated status: `active`, `idle`, `error` |
| `type` | string | No | Updated type: `coding`, `analysis`, `deployment`, `testing` |
| `xp` | integer | No | Updated XP value |
| `level` | integer | No | Updated level |
| `tasksCompleted` | integer | No | Updated tasks completed count |

**Example Request:**

```bash
curl -X PUT http://localhost:3000/api/agents/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "active",
    "xp": 1500
  }'
```

**Success Response (200):**

```json
{
  "data": {
    "id": "1",
    "name": "Updated Agent",
    "status": "active",
    "type": "coding",
    "xp": 1500,
    "level": 1,
    "tasksCompleted": 0,
    "updatedAt": "2026-01-28T12:34:56.789Z"
  }
}
```

**Error Response (400):**

```json
{
  "error": "Status must be one of: active, idle, error"
}
```

---

### Delete Agent

Delete an agent from the system.

**Endpoint:** `DELETE /api/agents/{id}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique agent identifier |

**Example Request:**

```bash
curl -X DELETE http://localhost:3000/api/agents/1
```

**Success Response (200):**

```json
{
  "message": "Agent deleted successfully",
  "id": "1"
}
```

**Error Response (500):**

```json
{
  "error": "Internal server error"
}
```

---

## Quests

Quests are gamified tasks that agents can complete to earn XP and level up.

### List Quests

Retrieve a list of all quests with optional filtering.

**Endpoint:** `GET /api/quests`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by quest status: `pending`, `active`, `completed`, `failed` |
| `difficulty` | string | No | Filter by difficulty: `easy`, `medium`, `hard` |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/quests?status=active&difficulty=medium"
```

**Success Response (200):**

```json
{
  "data": [
    {
      "id": "q1",
      "title": "Deploy Microservice",
      "description": "Deploy a new microservice to the production cluster",
      "status": "active",
      "difficulty": "medium",
      "xpReward": 500,
      "estimatedTime": "2 hours",
      "assignedAgents": ["1"],
      "progress": 65,
      "createdAt": "2026-01-28T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

**Error Response (500):**

```json
{
  "error": "Internal server error"
}
```

---

### Create Quest

Create a new quest for agents to complete.

**Endpoint:** `POST /api/quests`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Quest title |
| `description` | string | Yes | Detailed quest description |
| `difficulty` | string | Yes | Difficulty level: `easy`, `medium`, `hard` |
| `xpReward` | integer | No | XP reward for completion (default: 100) |
| `estimatedTime` | string | No | Estimated completion time (default: "1 hour") |
| `assignedAgents` | string[] | No | Array of agent IDs assigned to quest (default: []) |

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/quests \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Optimize Database Queries",
    "description": "Analyze and optimize slow database queries in the application",
    "difficulty": "medium",
    "xpReward": 750,
    "estimatedTime": "3 hours",
    "assignedAgents": ["2"]
  }'
```

**Success Response (201):**

```json
{
  "data": {
    "id": "qabc123",
    "title": "Optimize Database Queries",
    "description": "Analyze and optimize slow database queries in the application",
    "status": "pending",
    "difficulty": "medium",
    "xpReward": 750,
    "estimatedTime": "3 hours",
    "assignedAgents": ["2"],
    "progress": 0,
    "createdAt": "2026-01-28T12:34:56.789Z"
  }
}
```

**Error Responses:**

**400 - Missing Title:**
```json
{
  "error": "Title is required"
}
```

**400 - Missing Description:**
```json
{
  "error": "Description is required"
}
```

**400 - Missing Difficulty:**
```json
{
  "error": "Difficulty is required"
}
```

**400 - Invalid Difficulty:**
```json
{
  "error": "Difficulty must be one of: easy, medium, hard"
}
```

---

### Get Quest by ID

Retrieve detailed information about a specific quest, including subtasks.

**Endpoint:** `GET /api/quests/{id}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique quest identifier |

**Example Request:**

```bash
curl -X GET http://localhost:3000/api/quests/q1
```

**Success Response (200):**

```json
{
  "data": {
    "id": "q1",
    "title": "Deploy Microservice",
    "description": "Deploy a new microservice to the production cluster",
    "status": "active",
    "difficulty": "medium",
    "xpReward": 500,
    "estimatedTime": "2 hours",
    "assignedAgents": ["1"],
    "progress": 65,
    "createdAt": "2026-01-28T00:00:00.000Z",
    "tasks": [
      {
        "id": "t1",
        "name": "Setup environment",
        "completed": true
      },
      {
        "id": "t2",
        "name": "Build Docker image",
        "completed": true
      },
      {
        "id": "t3",
        "name": "Deploy to staging",
        "completed": false
      },
      {
        "id": "t4",
        "name": "Run integration tests",
        "completed": false
      }
    ]
  }
}
```

**Error Response (500):**

```json
{
  "error": "Internal server error"
}
```

---

### Update Quest

Update quest properties such as status, progress, or assigned agents.

**Endpoint:** `PUT /api/quests/{id}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique quest identifier |

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | No | Updated status: `pending`, `active`, `completed`, `failed` |
| `progress` | integer | No | Progress percentage (0-100) |
| `assignedAgents` | string[] | No | Updated array of assigned agent IDs |

**Example Request:**

```bash
curl -X PUT http://localhost:3000/api/quests/q1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "active",
    "progress": 85,
    "assignedAgents": ["1", "3"]
  }'
```

**Success Response (200):**

```json
{
  "data": {
    "id": "q1",
    "status": "active",
    "progress": 85,
    "assignedAgents": ["1", "3"],
    "updatedAt": "2026-01-28T12:34:56.789Z"
  }
}
```

**Error Responses:**

**400 - Invalid Status:**
```json
{
  "error": "Status must be one of: pending, active, completed, failed"
}
```

**400 - Invalid Progress:**
```json
{
  "error": "Progress must be a number between 0 and 100"
}
```

---

## Workflows

Workflows are predefined sequences of automated tasks for agents to execute.

### List Workflows

Retrieve a list of all available workflows.

**Endpoint:** `GET /api/workflows`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | No | Filter by workflow category (e.g., `deployment`, `development`, `data`) |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/workflows?category=deployment"
```

**Success Response (200):**

```json
{
  "data": [
    {
      "id": "w1",
      "name": "CI/CD Pipeline",
      "description": "Automated continuous integration and deployment workflow",
      "category": "deployment",
      "steps": 5,
      "estimatedDuration": "15 minutes",
      "popularity": 95,
      "createdAt": "2026-01-20T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

**Error Response (500):**

```json
{
  "error": "Internal server error"
}
```

---

### Create Workflow

Create a new automated workflow.

**Endpoint:** `POST /api/workflows`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Workflow name |
| `category` | string | Yes | Workflow category (e.g., `deployment`, `development`, `data`) |
| `steps` | array | Yes | Array of workflow steps (each step should be an object) |
| `description` | string | No | Workflow description (default: empty string) |
| `estimatedDuration` | string | No | Estimated completion time (default: "Unknown") |

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Security Audit Pipeline",
    "description": "Automated security scanning and vulnerability assessment",
    "category": "security",
    "steps": [
      {"order": 1, "name": "Run SAST scan"},
      {"order": 2, "name": "Check dependencies"},
      {"order": 3, "name": "Generate report"}
    ],
    "estimatedDuration": "10 minutes"
  }'
```

**Success Response (201):**

```json
{
  "data": {
    "id": "wabc123",
    "name": "Security Audit Pipeline",
    "description": "Automated security scanning and vulnerability assessment",
    "category": "security",
    "steps": 3,
    "estimatedDuration": "10 minutes",
    "popularity": 0,
    "createdAt": "2026-01-28T12:34:56.789Z"
  }
}
```

**Error Responses:**

**400 - Missing Name:**
```json
{
  "error": "Name is required"
}
```

**400 - Missing Category:**
```json
{
  "error": "Category is required"
}
```

**400 - Missing or Invalid Steps:**
```json
{
  "error": "Steps array is required"
}
```

---

## Subscriptions

Manage user subscription plans and billing information.

### Get Subscription

Retrieve subscription details for a specific user.

**Endpoint:** `GET /api/subscriptions`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | Unique user identifier |

**Example Request:**

```bash
curl -X GET "http://localhost:3000/api/subscriptions?userId=user123"
```

**Success Response (200):**

```json
{
  "data": {
    "id": "sub_123",
    "userId": "user123",
    "plan": "professional",
    "status": "active",
    "maxAgents": 10,
    "maxQuestsPerMonth": 100,
    "features": [
      "Advanced analytics",
      "Priority support",
      "Custom workflows",
      "API access"
    ],
    "billingCycle": "monthly",
    "amount": 99,
    "currency": "USD",
    "currentPeriodStart": "2026-01-01T00:00:00.000Z",
    "currentPeriodEnd": "2026-02-01T00:00:00.000Z",
    "createdAt": "2025-12-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

**400 - Missing User ID:**
```json
{
  "error": "userId query parameter is required"
}
```

**500 - Internal Error:**
```json
{
  "error": "Internal server error"
}
```

---

### Create Subscription

Create a new subscription for a user.

**Endpoint:** `POST /api/subscriptions`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | string | Yes | Unique user identifier |
| `plan` | string | Yes | Subscription plan: `starter`, `professional`, `enterprise` |
| `billingCycle` | string | No | Billing cycle: `monthly` or `yearly` (default: `monthly`) |

**Plan Details:**

| Plan | Max Agents | Max Quests/Month | Monthly Price | Features |
|------|-----------|------------------|---------------|----------|
| `starter` | 3 | 20 | $29 | Basic analytics, Email support |
| `professional` | 10 | 100 | $99 | Advanced analytics, Priority support, Custom workflows, API access |
| `enterprise` | Unlimited | Unlimited | $299 | Enterprise analytics, 24/7 dedicated support, Custom integrations, SLA guarantee, On-premise deployment |

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user456",
    "plan": "professional",
    "billingCycle": "monthly"
  }'
```

**Success Response (201):**

```json
{
  "data": {
    "id": "sub_abc123",
    "userId": "user456",
    "plan": "professional",
    "status": "active",
    "maxAgents": 10,
    "maxQuestsPerMonth": 100,
    "features": [
      "Advanced analytics",
      "Priority support",
      "Custom workflows",
      "API access"
    ],
    "billingCycle": "monthly",
    "amount": 99,
    "currency": "USD",
    "currentPeriodStart": "2026-01-28T12:34:56.789Z",
    "currentPeriodEnd": "2026-02-27T12:34:56.789Z",
    "createdAt": "2026-01-28T12:34:56.789Z"
  }
}
```

**Error Responses:**

**400 - Missing User ID:**
```json
{
  "error": "userId is required"
}
```

**400 - Missing Plan:**
```json
{
  "error": "plan is required"
}
```

**400 - Invalid Plan:**
```json
{
  "error": "Plan must be one of: starter, professional, enterprise"
}
```

---

## Development Notes

### Mock Data

All endpoints currently use mock data for development purposes. In production:

- Connect to a database (PostgreSQL, MongoDB, etc.)
- Implement proper data persistence
- Add database migrations
- Implement proper CRUD operations

### Security Considerations

Before deploying to production:

1. **Authentication:** Implement JWT or session-based authentication
2. **Authorization:** Add role-based access control (RBAC)
3. **Input Validation:** Add comprehensive input validation and sanitization
4. **Rate Limiting:** Implement rate limiting to prevent abuse
5. **CORS:** Configure CORS policies appropriately
6. **HTTPS:** Use HTTPS in production
7. **API Keys:** Implement API key management for programmatic access
8. **Webhook Signatures:** Verify webhook signatures from payment providers

### Testing

Test all endpoints using:

```bash
# Using curl
curl -X GET http://localhost:3000/api/agents

# Using Postman or Insomnia
# Import the API examples into your preferred API testing tool

# Using automated tests
npm run test
```

### Next Steps

1. Integrate with Stripe or another payment processor for subscriptions
2. Implement user authentication (NextAuth.js recommended)
3. Connect to a production database
4. Add comprehensive error logging and monitoring
5. Implement rate limiting
6. Add API versioning (e.g., `/api/v1/agents`)
7. Create OpenAPI/Swagger documentation
8. Add webhook endpoints for real-time notifications

---

## Support

For questions or issues:
- **Documentation:** [Link to docs]
- **GitHub Issues:** [Link to repository issues]
- **Email Support:** support@aitaskforce.pro (configure in production)

## Changelog

### Version 1.0.0 (2026-01-28)
- Initial API release
- Agents CRUD operations
- Quests management
- Workflows management
- Subscriptions management
