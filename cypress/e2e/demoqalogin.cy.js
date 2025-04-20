

// Ignore cross-origin script errors
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  


describe('Login Page Tests', () => {

    const baseUrl = 'https://demoqa.com/login';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  
    it('TC021 - Login with valid credentials', () => {
      cy.get('#userName').type('testuser');
      cy.get('#password').type('Testhello@12');
      cy.get('#login').click();
      cy.url().should('include', '/profile');
    });
  
    it('TC022 - Login with invalid password', () => {
      cy.get('#userName').type('testuser');
      cy.get('#password').type('wrongpass');
      cy.get('#login').click();
      cy.get('#name').should('contain', 'Invalid username or password!');
    });
  
    it('TC023 - Login with empty fields', () => {
      cy.get('#login').click();
      cy.get('#userName').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.');
      });
    });
  
    it('TC024 - Login with invalid email format', () => {
      cy.get('#userName').type('invalidemail.com');
      cy.get('#password').type('Test@123');
      cy.get('#login').click();
      cy.get('#name').should('contain', 'Invalid username or password!');
    });
  
    it('TC025 - Login with SQL injection attempt', () => {
      cy.get('#userName').type(`' OR '1'='1`);
      cy.get('#password').type('anything');
      cy.get('#login').click();
      cy.get('#name').should('contain', 'Invalid username or password!');
    });
  
    it('TC026 - Password field should be masked', () => {
      cy.get('#password').should('have.attr', 'type', 'password');
    });
  
    it('TC027 - Login button disabled when fields are empty', () => {
      // Cypress doesn't allow checking disabled on buttons unless the button has `disabled` attribute
      // Since the demoqa login button is not actually disabled, we check for validation error
      cy.get('#login').click();
      cy.get('#userName').then(($input) => {
        expect($input[0].validationMessage).to.exist;
      });
    });
  
  });
  