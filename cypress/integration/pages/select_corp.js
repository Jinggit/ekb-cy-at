import 'cypress-xpath';

//选择企业页面

class SelectCorp {
  selectEnterprise(corp) {
      cy.visit(Cypress.env('SELECTENTERPRISE_URI'));
      cy.waitLoadingMarkDisappear()
      cy.xpath("//*[text()='"+corp+"']").first().should('be.visible').click();
      cy.waitLoadingMarkDisappear()
      cy.xpath('//*[@class="ant-btn enter-corp-button"]').first().should('be.visible').click();
      cy.waitLoadingMarkDisappear()
    }

  }
  
  export default SelectCorp;