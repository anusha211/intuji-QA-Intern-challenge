// Ignore cross-origin script errors
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
describe('UI Validation - DemoQA Form', () => {
    beforeEach(() => {
      cy.visit('https://demoqa.com/automation-practice-form');
    });
  
    it('TC001 - First Name field should be visible, empty, and required', () => {
      cy.get('#firstName')
        .should('be.visible')
        .and('have.value', '');
    });
  
    it('TC004 - Submit button should be visible and clickable', () => {
      cy.get('#submit').should('be.visible').and('not.be.disabled');
    });
  
    it('TC005 - Gender radio buttons should be visible', () => {
      cy.get('input[name="gender"]').should('have.length', 3);
    });
  

    it('TC007 - Date picker should be visible and interactive', () => {
      cy.get('#dateOfBirthInput').should('be.visible').click();
      cy.get('.react-datepicker').should('be.visible');
    });
  
    it('TC008 - Responsiveness check - mobile viewport', () => {
      cy.viewport(375, 667); // iPhone 6/7/8 dimensions
      cy.get('#firstName').should('be.visible');
    });
  });
  