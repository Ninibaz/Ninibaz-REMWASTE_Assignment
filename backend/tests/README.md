# Backend Tests

This directory contains tests for the Todo App backend API. There are two types of tests:

1. **Unit/Integration Tests**: Using Jest and Supertest to test the API endpoints
2. **API Tests**: Using Postman/Newman to test the API endpoints

## Running Jest Tests

The Jest tests are located in the `auth.test.js` and `items.test.js` files. These tests verify that the authentication and item management endpoints work correctly.

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (useful during development)
npm run test:watch
```

## Running Postman/Newman Tests

The Postman tests are defined in the `Todo_API.postman_collection.json` file, with environment variables in `local.postman_environment.json`. These tests provide a comprehensive check of the API functionality.

```bash
# Install Newman globally if not already installed
npm install -g newman

# Run the Postman tests
newman run Todo_API.postman_collection.json --environment local.postman_environment.json
```

## Test Environment

The tests use a separate MongoDB database (`todo-app-test`) to avoid affecting the development or production data. The test environment is configured in the `setup.js` file.

## Test Coverage

The Jest tests aim to cover all API endpoints and include both positive and negative test cases. The coverage report can be generated using the `npm run test:coverage` command.

## Continuous Integration

These tests are automatically run in the CI/CD pipeline defined in the GitHub Actions workflow file (`.github/workflows/main.yml`). The workflow runs both the Jest tests and the Postman/Newman tests.