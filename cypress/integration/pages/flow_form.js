import 'cypress-xpath';

//新建表单页面

class NewFlow {

    chooseFlowSepcification(sepecification) {
      //选择单据模版
      cy.contains(sepecification).should('be.visible').click();
      // cy.window().then({
      //   timeout: 120000
      // }, win => new Cypress.Promise((resolve, reject) => win.requestIdleCallback(resolve)));
      return this;
    }

    choosePayerInfo() {
      //请选择收款信息
      cy.xpath('//*[@placeholder="请选择收款信息"]').should('be.visible').click();
      cy.contains('确 认').should('be.visible').click();
      //cy.wait(3000);
      return this;
    }

    inputDesc() {
      //请输入描述
      cy.xpath('//*[@placeholder="（选填）请输入描述"]')
        .should('be.visible')
        .type('景冠华{enter}')
        .type('合思{enter}')
        .type('QA{enter}');
      return this;
    }

    inputTitle(title) {
      //请输入标题
      cy.xpath('//*[@placeholder="请输入标题"]').scrollIntoView().should('be.visible').type(title);
      //cy.wait(3000);
      return this;
    }

    addDetails() {
      //添加费用明细
      cy.get('.import-detail').should('be.visible').click();
      cy.get('.type-name').should('be.visible').click();
      cy.contains('通讯').should('be.visible').click();
      cy.xpath('//*[@placeholder="请输入金额"]').should('be.visible').type('158',{force: true});
      cy.waitLoadingMarkDisappear();
      cy.contains('保 存').should('be.visible').click();
      //cy.wait(3000);
      return this;
    }

    submitForm() {
      //提交表单
      cy.contains('提交送审').should('be.visible').click();
      cy.contains('继 续').should('be.visible').click();
      cy.contains('提 交').should('be.visible').click();
      cy.contains('单据提交中').should('be.visible');
      cy.contains('成功').should('be.visible');
      cy.contains('关闭').should('be.visible').click();
      return this;
    }
     

  }
  
  export default NewFlow;