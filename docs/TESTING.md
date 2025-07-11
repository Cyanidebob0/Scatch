# Testing Guide

This guide covers testing strategies and procedures for the Scatch application.

## Test Types

### 1. Unit Tests

- Test individual functions and components in isolation
- Mock external dependencies
- Fast execution

### 2. Integration Tests

- Test interactions between components
- Include database operations
- Test API endpoints

### 3. End-to-End (E2E) Tests

- Test complete user flows
- Simulate real user interactions
- Run against a test database

## Test Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or test cluster)

### Installation

1. Install development dependencies:

   ```bash
   npm install --save-dev jest supertest mongodb-memory-server
   ```

2. Add test scripts to `package.json`:
   ```json
   "scripts": {
     "test": "jest --detectOpenHandles --forceExit",
     "test:watch": "jest --watch",
     "test:coverage": "jest --coverage"
   }
   ```

## Writing Tests

### Example Unit Test

```javascript
// tests/unit/auth.test.js
const { hashPassword, comparePassword } = require("../../utils/auth");

describe("Authentication Utilities", () => {
  describe("hashPassword", () => {
    it("should hash a password", async () => {
      const hashed = await hashPassword("password123");
      expect(hashed).not.toBe("password123");
      expect(hashed.length).toBeGreaterThan(0);
    });
  });

  describe("comparePassword", () => {
    it("should compare password with hash", async () => {
      const hashed = await hashPassword("password123");
      const match = await comparePassword("password123", hashed);
      expect(match).toBe(true);
    });
  });
});
```

### Example Integration Test

```javascript
// tests/integration/auth.test.js
const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User");

describe("Auth API", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("token");
    });
  });
});
```

## Test Database

### Using MongoDB Memory Server

```javascript
// tests/setup.js
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
```

## Test Coverage

Generate coverage report:

```bash
npm run test:coverage
```

This will create a `coverage` directory with detailed reports.

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mongodb:
        image: mongo:4.4
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v2

      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "14"

      - name: Install Dependencies
        run: npm ci

      - name: Run Tests
        run: npm test
        env:
          NODE_ENV: test
          MONGODB_URI: mongodb://localhost:27017/test
```

## API Testing with Postman

1. **Import Collection**

   - Import the Postman collection from `docs/postman/Scatch.postman_collection.json`
   - Set up environment variables in Postman:
     - `base_url`: Your API base URL
     - `token`: JWT token (will be set after login)

2. **Test Scripts**
   Add test scripts in Postman to validate responses:

   ```javascript
   // Example test script for login
   pm.test("Status code is 200", function () {
     pm.response.to.have.status(200);
   });

   pm.test("Response has token", function () {
     var jsonData = pm.response.json();
     pm.expect(jsonData.token).to.exist;
     pm.environment.set("token", jsonData.token);
   });
   ```

## Performance Testing

### Using Artillery

1. Install Artillery:

   ```bash
   npm install -g artillery
   ```

2. Create test script `load-test.yml`:

   ```yaml
   config:
     target: "http://localhost:3000"
     phases:
       - duration: 60
         arrivalRate: 10
   scenarios:
     - name: "Load Test"
       flow:
         - get:
             url: "/api/v1/products"
   ```

3. Run the test:
   ```bash
   artillery run load-test.yml
   ```

## Security Testing

1. **Dependency Scanning**

   ```bash
   npm audit
   ```

2. **OWASP ZAP**
   - Install OWASP ZAP
   - Configure to scan your API endpoints
   - Run automated scans

## Best Practices

1. **Test Organization**

   - Group related tests in `describe` blocks
   - Use clear, descriptive test names
   - Follow the Arrange-Act-Assert pattern

2. **Test Data**

   - Use factories/fixtures for test data
   - Clean up test data after tests
   - Use unique values to avoid conflicts

3. **Assertions**

   - Test one thing per test case
   - Use specific assertions
   - Include meaningful error messages

4. **Performance**
   - Mock external services in unit tests
   - Use test database for integration tests
   - Run tests in parallel when possible

## Troubleshooting

1. **Tests Hanging**

   - Ensure all async operations are properly awaited
   - Use `--detectOpenHandles` flag
   - Check for unclosed database connections

2. **Database Connection Issues**
   - Verify MongoDB is running
   - Check connection string in test environment
   - Ensure proper cleanup between tests
