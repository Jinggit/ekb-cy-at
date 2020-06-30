import 'cypress-xpath';
import NewFlow from './flow_form';

class LeftMenu {
    showMenu() {
        cy.get('#layout5-menu-wrap')
          .should('be.visible')
        .click();
    }

    goToMy() {
        cy.xpath('//*[text()="我的"]')
          .should('be.visible')
          .click();
    }

    goToMyFlow() {
        cy.xpath('//*[text()="我的单据"]')
          .should('be.visible')
          .click();
    }

    createNewFlow(){
        cy.xpath('//*[text()="新 建"]')
        .should('be.visible')
        .click();

        const flow = new NewFlow();
        return flow;
    }

  }
  
  export default LeftMenu;