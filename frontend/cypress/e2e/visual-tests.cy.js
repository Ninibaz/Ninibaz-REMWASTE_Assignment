describe('Visual Tests', () => {
  beforeEach(() => {
    // Set up a fake token in localStorage for authenticated views
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fake-jwt-token');
    });
  });

  it('should match login page snapshot', () => {
    // Clear token to see login page
    cy.clearLocalStorage();
    cy.visit('/login');
    
    // Wait for the page to fully load
    cy.get('[data-cy=login-button]').should('be.visible');
    
    // Take a snapshot of the login page
    cy.matchImageSnapshot('login-page');
  });

  it('should match todo list page snapshot', () => {
    // Intercept the GET todos API call
    cy.interceptApi('GET', '/items', {
      statusCode: 200,
      body: [
        { _id: '1', text: 'Test Todo 1', completed: false },
        { _id: '2', text: 'Test Todo 2', completed: true }
      ]
    }).as('getTodos');

    // Visit the todo list page
    cy.visit('/');
    cy.wait('@getTodos');
    
    // Wait for the page to fully load
    cy.get('[data-cy=todo-item]').should('have.length', 2);
    
    // Take a snapshot of the todo list page
    cy.matchImageSnapshot('todo-list-page');
  });

  it('should match todo item in edit mode snapshot', () => {
    // Intercept the GET todos API call
    cy.intercept('GET', 'http://localhost:5000/api/items', {
      statusCode: 200,
      body: [
        { _id: '1', text: 'Test Todo 1', completed: false },
        { _id: '2', text: 'Test Todo 2', completed: true }
      ]
    }).as('getTodos');

    // Visit the todo list page
    cy.visit('/');
    cy.wait('@getTodos');
    
    // Click the edit button on the first todo
    cy.get('[data-cy=todo-item]').first().find('[data-cy=edit-button]').click();
    
    // Wait for edit mode to be active
    cy.get('[data-cy=edit-input]').should('be.visible');
    
    // Take a snapshot of the todo item in edit mode
    cy.matchImageSnapshot('todo-edit-mode');
  });

  it('should match error state snapshot', () => {
    // Clear token to see login page
    cy.clearLocalStorage();
    cy.visit('/login');
    
    // Intercept the login API call with an error response
    cy.interceptApi('POST', '/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' }
    }).as('loginRequest');

    // Fill in the form with invalid credentials
    cy.get('[data-cy=email-input]').type('wrong@example.com');
    cy.get('[data-cy=password-input]').type('wrongpassword');
    cy.get('[data-cy=login-button]').click();

    // Wait for the API call to complete
    cy.wait('@loginRequest');
    
    // Wait for the error message to appear
    cy.get('.alert-danger').should('be.visible');
    
    // Take a snapshot of the error state
    cy.matchImageSnapshot('login-error-state');
  });
});