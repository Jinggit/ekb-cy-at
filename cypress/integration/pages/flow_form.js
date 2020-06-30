import 'cypress-xpath';

class NewFlow {
    fullScreen() {
        cy.get('#layout5-menu-wrap')
          .should('be.visible')
          .click();
    }

  }
  
  export default NewFlow;