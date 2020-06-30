// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
//不需要UI登录进行自定义命令测试
import * as rand from '../../utils/Rand';

let payeeId = ''
let feeTypeId = ''
let expenseSpecificationId = ''
let specificationId = ''

describe('自定义命令测试', () => {
    beforeEach(() => {
        //通过API请求进行登录操作
        cy.login({userType:"userA"})
        .chooseCorporation()
        .initLanguage()

        cy.createPayee()
          .then(response => {
            cy.log(response.body.id)
            payeeId = response.body.id
        })

        cy.getFeeTypes()
          .then(response => {
            feeTypeId = cy.feeTypeId
            expenseSpecificationId = cy.expenseSpecificationId
          })

        cy.getSpecificationGroups()
          .then(response => {
            specificationId = cy.specificationId
          })
    });

    //测试用例
    tests();

    //afterEach(() => {

    //});
});

function tests() {

    it('测试自定义命令cy.createSaveFlow()', () => {
      const session = JSON.parse(localStorage.getItem('session'))
      const corpId = session.user.corpId
      const userId = session.user.userId
      const title = 'e2e测试单' + rand.makeid(5);
          const userCustom = {
            "req":{
                freeFlow: {
                  "name": "freeflow.edit",
                  "form": {
                    "title": title,
                    "submitterId": corpId+':'+userId,
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
                        "u_{{propertyName}}": "1",
                        "consumptionReasons": "打车",
                        "attachments": []
                      }
                    }],
                    "specificationId": specificationId
                  },
                  "params": {
                    "loanWrittenOff": [{
                      "loanInfoId":"{{loanInfoId}}",
                      "title": "{{loanFlowFormTitle}}",
                      "repaymentDate": "{{oneMonthLaterTimmStamp}}",
                      "fromApply": false,
                      "flowId": "{{loanFlowId}}",
                      "hasImported": false,
                      "amount": "150.00"
                    }]
                  }
                }
              }
          }
  
           cy.createSaveFlow(corpId,userCustom)
           .then(response => {
             expect(response.body).have.property('error',flase)
           })
    });


}

