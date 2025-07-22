# Cypress Tests

## Overview

This directory contains Cypress tests for the Todo application frontend. The tests are organized into end-to-end (e2e) tests that verify the application's functionality from a user's perspective.

## Test Structure

- **e2e/**: Contains end-to-end test files
  - `login.cy.js`: Tests for the login functionality
  - `todos.cy.js`: Tests for the todo list functionality
  - `visual-tests.cy.js`: Visual regression tests using cypress-image-snapshot

- **support/**: Contains support files for Cypress tests
  - `commands.js`: Custom Cypress commands
  - `e2e.js`: Configuration for e2e tests

- **snapshots/**: Contains baseline images for visual regression tests

## Environment Variables

Cypress tests now use environment variables for configuration. These are set in the `.env` file in the frontend directory. The following environment variables are used:

```
CYPRESS_BASE_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:5000/api
```

These variables are loaded in the following ways:

1. `cypress.config.js` loads the `.env` file using dotenv
2. The base URL is set from `CYPRESS_BASE_URL` or defaults to `http://localhost:3000`
3. The API URL is set from `REACT_APP_API_URL` or defaults to `http://localhost:5000/api`

## Custom Commands

The following custom commands have been added to simplify API interactions:

- `cy.getApiUrl()`: Returns the configured API URL
- `cy.interceptApi(method, endpoint, response)`: Intercepts API requests with the correct base URL

Example usage:

```javascript
// Instead of hardcoding the API URL
cy.interceptApi('GET', '/items', {
  statusCode: 200,
  body: [{ _id: '1', text: 'Test Todo', completed: false }]
});
```

## Running Tests

To run the Cypress tests:

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run tests in headless mode
npm run cypress:run
```

## Visual Regression Tests

Visual regression tests use the cypress-image-snapshot plugin to compare screenshots against baseline images. If the UI changes, the tests will fail, and you'll need to update the baseline images.

To update baseline images:

```bash
npm run cypress:update-snapshots
```