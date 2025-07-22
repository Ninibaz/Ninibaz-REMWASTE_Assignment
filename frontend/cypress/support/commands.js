// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Import cypress-image-snapshot commands
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

// Add the 'matchImageSnapshot' command
addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport', // capture viewport in screenshot
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to get API URL
Cypress.Commands.add('getApiUrl', () => {
  return Cypress.env('apiUrl') || 'http://localhost:5000/api';
});

// Custom command to intercept API requests with the correct base URL
Cypress.Commands.add('interceptApi', (method, endpoint, response) => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:5000/api';
  return cy.intercept(method, `${apiUrl}${endpoint}`, response);
});