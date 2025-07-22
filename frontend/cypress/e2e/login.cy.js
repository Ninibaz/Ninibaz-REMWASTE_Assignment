describe('Login Functionality', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('[data-cy=email-input]').should('be.visible');
    cy.get('[data-cy=password-input]').should('be.visible');
    cy.get('[data-cy=login-button]').should('be.visible');
  });

  it('should login with valid credentials', () => {
    // Intercept the login API call
    cy.intercept('POST', `${Cypress.env('apiUrl')}/login`, {
      statusCode: 200,
      body: { token: 'fake-jwt-token' }
    }).as('loginRequest');

    // Fill in the form
    cy.get('[data-cy=email-input]').type('test@example.com');
    cy.get('[data-cy=password-input]').type('password123');
    cy.get('[data-cy=login-button]').click();

    // Wait for the API call to complete
    cy.wait('@loginRequest');

    // Verify we're redirected to the todo list
    cy.url().should('not.include', '/login');
    cy.get('[data-cy=todo-list]').should('be.visible');
  });

  it('should show error with invalid credentials', () => {
    // Intercept the login API call with an error response
    cy.interceptApi('POST', '/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' }
    }).as('loginRequest');

    // Fill in the form
    cy.get('[data-cy=email-input]').type('wrong@example.com');
    cy.get('[data-cy=password-input]').type('wrongpassword');
    cy.get('[data-cy=login-button]').click();

    // Wait for the API call to complete
    cy.wait('@loginRequest');

    // Verify we're still on the login page and error is shown
    cy.url().should('include', '/login');
    cy.get('.alert-danger').should('be.visible');
  });

  it('should validate required fields', () => {
    // Try to submit without filling in the form
    cy.get('[data-cy=login-button]').click();
    
    // Check that form validation prevents submission
    cy.url().should('include', '/login');
  });
});