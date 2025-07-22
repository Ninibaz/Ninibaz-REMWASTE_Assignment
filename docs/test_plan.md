# Todo Application Test Plan

## 1. Introduction

This document outlines the test strategy for the Todo Application, which consists of a React frontend and a Node.js backend API. The purpose of this test plan is to ensure that the application meets all functional requirements and maintains high quality through automated testing.

## 2. What is Being Tested

### 2.1 Frontend (React)

- User authentication (login functionality)
- Todo item management (create, read, update, delete)
- UI components and their interactions
- Form validations
- Error handling and display
- Responsive design

### 2.2 Backend (Node.js API)

- Authentication endpoints (login, register)
- Todo item CRUD operations
- Data validation
- Error handling
- Authorization checks

## 3. Test Coverage Areas

### 3.1 Functional Testing

- **UI Automation Tests**: Verify that the frontend components work correctly and user interactions produce the expected results.
- **API Tests**: Ensure that the backend API endpoints respond correctly to various requests.

### 3.2 Integration Testing

- Verify that the frontend and backend components work together correctly.
- Test the complete user flows from UI to database and back.

### 3.3 Negative Testing

- Test with invalid inputs, unauthorized access attempts, and other edge cases.
- Verify that the application handles errors gracefully.

### 3.4 Visual Testing

- Capture and compare snapshots of UI components to detect unintended visual changes.

## 4. Tools Used and Why

### 4.1 Frontend Testing

- **Cypress**: End-to-end testing framework for web applications.
  - Provides real browser testing environment
  - Allows for testing complete user flows
  - Offers time-travel debugging
  - Supports visual testing through snapshots
  - Has good documentation and community support

### 4.2 API Testing

- **Postman/Newman**: API testing and documentation platform.
  - Allows for creating and organizing API test collections
  - Supports test automation through Newman CLI
  - Provides environment variables for different test environments
  - Enables test assertions for response validation
  - Can be integrated into CI/CD pipelines

### 4.3 CI/CD Integration

- **GitHub Actions**: Continuous integration and deployment platform.
  - Integrates directly with GitHub repositories
  - Provides automated workflow execution
  - Supports parallel test execution
  - Offers detailed test reports and notifications

## 5. How to Run the Tests

### 5.1 Frontend Tests (Cypress)

```bash
# Install dependencies
cd frontend
npm install

# Run Cypress tests in interactive mode
npm run cypress:open

# Run Cypress tests in headless mode
npm run cypress:run
```

### 5.2 API Tests (Postman/Newman)

```bash
# Install Newman globally
npm install -g newman

# Run the Postman collection
newman run backend/tests/Todo_API.postman_collection.json
```

### 5.3 Running Tests in CI/CD

Tests are automatically executed on GitHub Actions when code is pushed to the repository. The workflow is defined in `.github/workflows/main.yml`.

## 6. Assumptions and Limitations

### 6.1 Assumptions

- The application is running in a development environment with MongoDB available.
- Test data is created and cleaned up as part of the test execution.
- The frontend and backend are running on their default ports (3000 for React, 5000 for Node.js).

### 6.2 Limitations

- The tests do not cover performance or load testing.
- Visual testing is limited to component snapshots and does not include cross-browser compatibility testing.
- The tests assume a clean database state and may fail if run against a production database.

## 7. Future Improvements

- Add performance testing using tools like Lighthouse or JMeter.
- Implement cross-browser testing using BrowserStack or Sauce Labs.
- Add accessibility testing using tools like axe or Lighthouse.
- Expand test coverage to include more edge cases and user scenarios.