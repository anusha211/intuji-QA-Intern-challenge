// Ignore cross-origin script errors
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  

describe('DemoQA Practice Form - Validation Tests', () => {
    beforeEach(() => {
      cy.visit('https://demoqa.com/automation-practice-form');
    });

  
    it('TC001 - Validates correct input for first name, last name, email', () => {
      cy.get('#firstName').type('Anusha');
      cy.get('#lastName').type('Chalise');
      cy.get('#userEmail').type('anusha@email.com');
      cy.get('#userEmail:invalid').should('not.exist'); // No validation error
    });
  
    it("TC002 - Shows validation for incorrect email", () => {
      cy.get('#userEmail').type('anushaexample.com');
      cy.get('#userEmail:invalid').should('exist');
    });
  
    it("TC003 - Shows error for long name and short mobile", () => {
      cy.get('#firstName').type('A'.repeat(60));
      cy.get('#userNumber').type('123456789'); // 9 digits
      cy.get('#userNumber').should('have.attr', 'minlength', '10');
    });
  
    it('TC004 - Validates proper date selection from calendar', () => {
      cy.get('#dateOfBirthInput').click();
      cy.get('.react-datepicker__year-select').select('2000');
      cy.get('.react-datepicker__month-select').select('January');
      cy.contains('.react-datepicker__day', '5').click();
      cy.get('#dateOfBirthInput').should('have.value', '05 Jan 2000');
    });
  
    it('TC005 - Invalid manual date format entry', () => {
        // Step 1: Get and clear the input
        cy.get('#dateOfBirthInput')
          .should('be.visible')
          .clear();
      
        // Step 2: Type into it in a separate step to avoid stale reference
        cy.get('#dateOfBirthInput').type('2000-01-05{enter}');
      
        // Step 3: Re-query and assert the value (not accepted format)
        cy.get('#dateOfBirthInput').should('not.have.value', '2000-01-05');
      });
      
      
      
  
    it('TC006 - Edge Case: Enter Feb 29, 2000 (leap year)', () => {
      cy.get('#dateOfBirthInput').click();
      cy.get('.react-datepicker__year-select').select('2000');
      cy.get('.react-datepicker__month-select').select('February');
      cy.contains('.react-datepicker__day--029', '29').click();
      cy.get('#dateOfBirthInput').should('contain.value', '29 Feb 2000');
    });
  
    it('TC007 - Validates correct subject input', () => {
      cy.get('.subjects-auto-complete__value-container').click().type('Maths{enter}');
      cy.get('.subjects-auto-complete__multi-value').should('contain.text', 'Maths');
    });
  
    it('TC008 - Invalid subject input', () => {
      cy.get('.subjects-auto-complete__value-container').click().type('###{enter}');
      cy.get('.subjects-auto-complete__multi-value').should('not.exist');
    });
  
    it('TC009 - Edge case: very long subject name', () => {
      const longSubject = 'A'.repeat(60);
      cy.get('.subjects-auto-complete__value-container').click().type(`${longSubject}{enter}`);
      cy.get('.subjects-auto-complete__multi-value').should('not.contain.text', longSubject);
    });
  
    it('TC010 - Upload valid .jpg file', () => {
      cy.get('#uploadPicture').selectFile('cypress/fixtures/photo.jpg');
      cy.get('#uploadPicture').should('exist');
    });
  
    it('TC011 - Upload invalid excel file', () => {
      cy.get('#uploadPicture').selectFile('cypress/fixtures/file.xlsx');
      // No built-in error, you may need to check via API or UI behavior
    });
    
    it('TC012 - Upload .jpg >200KB (edge)', () => {
        cy.get('#uploadPicture').selectFile('cypress/fixtures/largefile.jpg');
        // You can assert max size at the API if it's rejected
      });

  
    it('TC013 - Valid address', () => {
      cy.get('#currentAddress').type('123 Main Street');
      cy.get('#currentAddress').should('have.value', '123 Main Street');
    });
  
    it('TC014 - Empty address validation', () => {
      cy.get('#submit').click();
      cy.get('#currentAddress:invalid').should('exist');
    });
  
    it('TC015 - Long address >500 chars', () => {
      const longAddress = 'A'.repeat(550);
      cy.get('#currentAddress').type(longAddress);
      cy.get('#currentAddress').should('have.value', longAddress);
    });
  
    it('TC016 - Validate state and city dropdown', () => {
      cy.get('#state').click().contains('NCR').click();
      cy.get('#city').click().contains('Delhi').click();
      cy.get('#state .css-1uccc91-singleValue').should('contain.text', 'NCR');
      cy.get('#city .css-1uccc91-singleValue').should('contain.text', 'Delhi');
    });
  
    it('TC017 - Empty state/city', () => {
      cy.get('#submit').click();
      cy.get('#state .css-1wa3eu0-placeholder').should('contain.text', 'Select State');
    });
  });
  