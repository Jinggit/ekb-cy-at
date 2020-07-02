// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
//不需要UI登录进行单据页面的端到端测试
import 'cypress-xpath';
import * as rand from '../../utils/Rand';

let payeeId
let feeTypeId
let expenseSpecificationId
let specificationId
let userId
const title = 'e2e测试单' + rand.makeid(5);

describe('测试单据查询', () => {
    before(() => {
        //通过API请求进行登录操作
        cy.clearCookies()
        cy.login({userType:"userB"})
        .then(response => {
            userId = cy.userId
          })
        .chooseCorporation({cropId:"corpB"})
        .initLanguage()


        findTemplate(title)
          cy.contains('没有找到您所要的结果').should('be.visible')

        cy.createPayee()
          .then(response => {
            payeeId = cy.payeeId
        })

        cy.getFeeTypes('打车')
          .then(response => {
            feeTypeId = cy.feeTypeId
            expenseSpecificationId = cy.expenseSpecificationId
          })

        cy.getSpecificationGroups('日常报销单')
          .then(response => {
            specificationId = cy.specificationId
          })
    });

    beforeEach(() =>{
        //通过API创建单据
        const corpId = Cypress.env('CORPID_USER_B')
        const userCustom = {
                "req":{
                      "name": "freeflow.edit",
                      "form": {
                        "title": title,
                        "submitterId": corpId+':'+ userId,
                        "expenseDate": Date.now(),
                        "expenseDepartment": corpId,
                        "payeeId": payeeId,
                        "description": "这是cypress e2e测试",
                        "details": [{
                          "feeTypeId": feeTypeId,
                          "specificationId": expenseSpecificationId,
                          "feeTypeForm": {
                            "amount": {
                              "standard": "158",
                              "standardStrCode": "CNY",
                              "standardNumCode": "156",
                              "standardSymbol": "¥",
                              "standardUnit": "元",
                              "standardScale": 2
                            },
                            "feeDate": Date.now(),
                            "invoiceForm": {
                              "type": "noWrite"
                            },
                            "consumptionReasons": "打车",
                            "attachments": []
                          }
                        }],
                        "specificationId": specificationId
                      }
                  }
              }
        cy.createSaveFlow(corpId,userCustom)

    });

    //测试用例
    tests();

    afterEach(() => {
        //通过API请求进行退出操作
        //cy.logout();
    });
});



function tests() {

    it('测试单据查询', function()  {
        findTemplate(title)
        cy.contains('.bill-name',title).click()
        cy.get('.label-template').should('be.visible')

    });

}

function findTemplate (title) {
  cy.visit('/web/app.html?_=1565142276804/bills');
  cy.get('.search-icon > .icon').should('be.visible').click()
  cy.get('.ant-input').should('be.visible').type(title+'{enter}')
}
