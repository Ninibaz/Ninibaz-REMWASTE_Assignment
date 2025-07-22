describe('Todo CRUD Operations', () => {
  beforeEach(() => {
    // Set up a fake token in localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fake-jwt-token');
    });

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
  });

  it('should display the todo list', () => {
    cy.get('[data-cy=todo-item]').should('have.length', 2);
    cy.contains('Test Todo 1').should('be.visible');
    cy.contains('Test Todo 2').should('be.visible');
  });

  it('should add a new todo', () => {
    // Intercept the POST request
    cy.interceptApi('POST', '/items', {
      statusCode: 201,
      body: { _id: '3', text: 'New Todo', completed: false }
    }).as('addTodo');

    // Add a new todo
    cy.get('[data-cy=add-todo-input]').type('New Todo');
    cy.get('[data-cy=add-todo-button]').click();

    // Wait for the API call to complete
    cy.wait('@addTodo');

    // Verify the new todo is added to the list
    cy.get('[data-cy=todo-item]').should('have.length', 3);
    cy.contains('New Todo').should('be.visible');
  });

  it('should edit a todo', () => {
    // Intercept the PUT request
    cy.interceptApi('PUT', '/items/1', {
      statusCode: 200,
      body: { _id: '1', text: 'Updated Todo', completed: false }
    }).as('updateTodo');

    // Click the edit button on the first todo
    cy.get('[data-cy=todo-item]').first().find('[data-cy=edit-button]').click();

    // Update the todo text
    cy.get('[data-cy=edit-input]').clear().type('Updated Todo');
    cy.get('[data-cy=update-button]').click();

    // Wait for the API call to complete
    cy.wait('@updateTodo');

    // Verify the todo is updated
    cy.get('[data-cy=todo-item]').first().find('[data-cy=todo-text]').should('have.text', 'Updated Todo');
  });

  it('should delete a todo', () => {
    // Intercept the DELETE request
    cy.interceptApi('DELETE', '/items/1', {
      statusCode: 200,
      body: { message: 'Todo deleted' }
    }).as('deleteTodo');

    // Click the delete button on the first todo
    cy.get('[data-cy=todo-item]').first().find('[data-cy=delete-button]').click();

    // Wait for the API call to complete
    cy.wait('@deleteTodo');

    // Verify the todo is removed from the list
    cy.get('[data-cy=todo-item]').should('have.length', 1);
    cy.contains('Test Todo 1').should('not.exist');
  });

  it('should toggle todo completion status', () => {
    // Intercept the PUT request
    cy.intercept('PUT', 'http://localhost:5000/api/items/1', {
      statusCode: 200,
      body: { _id: '1', text: 'Test Todo 1', completed: true }
    }).as('toggleTodo');

    // Click the checkbox on the first todo
    cy.get('[data-cy=todo-item]').first().find('[data-cy=todo-checkbox]').click();

    // Wait for the API call to complete
    cy.wait('@toggleTodo');

    // Verify the todo's completed status is toggled
    cy.get('[data-cy=todo-item]').first().should('have.class', 'completed');
  });

  it('should cancel editing a todo', () => {
    // Click the edit button on the first todo
    cy.get('[data-cy=todo-item]').first().find('[data-cy=edit-button]').click();

    // Verify edit mode is active
    cy.get('[data-cy=edit-input]').should('be.visible');

    // Click the cancel button
    cy.get('[data-cy=cancel-button]').click();

    // Verify we're back to view mode
    cy.get('[data-cy=todo-text]').should('be.visible');
    cy.get('[data-cy=edit-input]').should('not.exist');
  });
});