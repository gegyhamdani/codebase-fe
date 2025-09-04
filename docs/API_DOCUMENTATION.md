# API Documentation

This document provides examples of how to use the dummy APIs created for the web-analytic-frontend project.

## Base URL

When running locally: `http://localhost:3000/api`

## APIs

### 1. Authentication API

**Endpoint:** `POST /api/login`

**Description:** Authenticates a user with username and password

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Available Users:**

- Username: `admin`, Password: `admin123`, Email: `admin@example.com`
- Username: `user1`, Password: `password123`, Email: `user1@example.com`
- Username: `demo`, Password: `demo123`, Email: `demo@example.com`

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "dummy-token-1-1693747200000",
    "userId": "1",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

**Error Response (401):**

```json
{
  "status": "error",
  "message": "Invalid username or password",
  "data": null
}
```

### 2. Data Listing API with Pagination

**Endpoint:** `GET /api/data`

**Description:** Retrieves a paginated list of sample data with optional filtering

**Query Parameters:**

- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10, max: 100): Items per page
- `category` (optional): Filter by category (`electronics`, `household`, `tools`)
- `status` (optional): Filter by status (`active`, `inactive`, `pending`)
- `search` (optional): Search in title and description

**Examples:**

- Get first page: `GET /api/data`
- Get second page with 5 items: `GET /api/data?page=2&limit=5`
- Filter by category: `GET /api/data?category=electronics`
- Search products: `GET /api/data?search=premium`
- Combined filters: `GET /api/data?category=electronics&status=active&page=1&limit=5`

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Data retrieved successfully",
  "data": [
    {
      "id": "1",
      "title": "Sample Product A",
      "description": "High-quality product with excellent features",
      "category": "electronics",
      "value": 299.99,
      "createdAt": "2024-01-15T10:30:00Z",
      "status": "active"
    }
  ],
  "pagination": {
    "totalItems": 10,
    "totalPages": 2,
    "currentPage": 1,
    "limit": 5
  }
}
```

### 3. Aggregation API

**Endpoint:** `GET /api/aggregation`

**Description:** Provides aggregated statistics from the sample data

**Query Parameters (all optional):**

- `category`: Filter by category before aggregation
- `status`: Filter by status before aggregation
- `startDate`: Filter by creation date (ISO format: 2024-01-15)
- `endDate`: Filter by creation date (ISO format: 2024-01-25)

**Examples:**

- Get all aggregations: `GET /api/aggregation`
- Aggregation for electronics: `GET /api/aggregation?category=electronics`
- Aggregation for date range: `GET /api/aggregation?startDate=2024-01-15&endDate=2024-01-20`

**Success Response (200):**

```json
{
  "status": "success",
  "message": "Aggregation data retrieved successfully",
  "data": {
    "totalCount": 10,
    "totalValue": 3939.89,
    "averageValue": 393.99,
    "categoryBreakdown": [
      {
        "category": "electronics",
        "count": 4,
        "totalValue": 1749.96
      },
      {
        "category": "household",
        "count": 3,
        "totalValue": 159.97
      },
      {
        "category": "tools",
        "count": 3,
        "totalValue": 2029.97
      }
    ],
    "statusBreakdown": [
      {
        "status": "active",
        "count": 6
      },
      {
        "status": "inactive",
        "count": 2
      },
      {
        "status": "pending",
        "count": 2
      }
    ]
  }
}
```

## Testing the APIs

### Using curl:

1. **Login:**

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

2. **Get data:**

```bash
curl "http://localhost:3000/api/data?page=1&limit=5&category=electronics"
```

3. **Get aggregations:**

```bash
curl "http://localhost:3000/api/aggregation?category=electronics"
```

### Using JavaScript fetch:

```javascript
// Login
const loginResponse = await fetch('http://localhost:3000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'
  })
})
const loginData = await loginResponse.json()

// Get data
const dataResponse = await fetch('http://localhost:3000/api/data?page=1&limit=10')
const data = await dataResponse.json()

// Get aggregations
const aggResponse = await fetch('http://localhost:3000/api/aggregation')
const aggregations = await aggResponse.json()
```

## CORS Configuration

The APIs are configured to accept requests from external domains. In production, you should restrict the `Access-Control-Allow-Origin` header to specific trusted domains instead of using `*`.

## Notes

- All APIs return a consistent response format with `status`, `message`, `data`, and optional `pagination` fields
- Error responses include appropriate HTTP status codes
- The pagination API supports filtering and searching
- The aggregation API provides statistical summaries of the data
- All data is dummy/mock data for demonstration purposes
