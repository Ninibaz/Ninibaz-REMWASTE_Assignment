// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Set up environment variables for tests
before(() => {
  // Set API URL from Cypress environment or use default
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:5000/api';
  Cypress.env('apiUrl', apiUrl);
  console.log(`Using API URL: ${apiUrl}`);
});