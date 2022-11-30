import 'cypress-xpath';
import NewFlow from './flow_form';

//lefe side menu

class LeftMenu {
    showMenu() {
        cy.xpath('//*[text()="Log your each consumption here."]')
          .should('be.visible')
        cy.xpath('//*[@class="layout5-menu-logo"]')
          .should('be.visible')
          .click();
    }

    goToMy() {
        cy.xpath('//*[text()="Me"]')
          .should('be.visible')
          .click();
    }

    goToMyFlow() {
        cy.xpath('//*[text()="My Invoice"]')
          .should('be.visible')
          .click();
    }

    createNewFlow(){
        cy.xpath('//*[@class="ant-btn header-action ant-btn-primary"]')
          .should('be.visible')
          .click();

        const flow = new NewFlow();
        return flow;
    }

  }
  
  export default LeftMenu;
