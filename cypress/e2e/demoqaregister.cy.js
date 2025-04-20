// Ignore cross-origin script errors
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  

describe('DemoQA Registration Page Tests', () => {
    const baseUrl = 'https://demoqa.com/register';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  

    it('TC030 - Register with blank fields', () => {
      cy.get('#register').click();
      cy.get('#firstname').then($el => {
        expect($el[0].validationMessage).to.exist;
      });
    });
  


    it('TC034 - Register with only First Name filled', () => {
      cy.get('#firstname').type('OnlyFirst');
      cy.get('#register').click();
  
      cy.get('#lastname').then($el => {
        expect($el[0].validationMessage).to.exist;
      });
    });
  });
  