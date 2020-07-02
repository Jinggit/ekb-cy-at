import 'cypress-xpath';
import NewFlow from './flow_form';

//左侧导航菜单页面

class LeftMenu {
    showMenu() {
        cy.xpath('//*[text()="随时随地记录每笔费用"]')
          .should('be.visible')
        cy.xpath('//*[@class="layout5-menu-logo"]')
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
        cy.xpath('//*[@class="ant-btn header-action ant-btn-primary"]')
          .should('be.visible')
          .click();

        const flow = new NewFlow();
        return flow;
    }

  }
  
  export default LeftMenu;