// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
//不需要UI登录进行自定义命令测试
import * as rand from '../../utils/Rand';
import * as date from '../../utils/DateFormat';
import dayjs from 'dayjs'

let payeeId = ''
let feeTypeId = ''
let expenseSpecificationId = ''
let specificationId = ''
let loanSpecificationId = ''
let reqFeeTypeId = ''
let reqExpenseSpecificationId = ''
let reqSpecificationId = ''

describe('自定义命令测试', () => {
    beforeEach(() => {
        //通过API请求进行登录操作
        cy.clearCookies()
        cy.login({userType:"userB"})
        .chooseCorporation({cropId:"corpB"})
        .initLanguage()

        cy.createPayee()
          .then(response => {
            payeeId = cy.payeeId
            cy.log(payeeId)
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


        cy.getSpecificationGroups('借款单')
          .then(response => {
            loanSpecificationId = cy.specificationId
          })


        cy.getFeeTypes('餐饮')
          .then(response => {
            reqFeeTypeId = cy.feeTypeId
            reqExpenseSpecificationId = cy.expenseSpecificationId
          })
        cy.getSpecificationGroups('申请单')
          .then(response => {
            reqSpecificationId = cy.specificationId
          })
    });

    //测试用例
    testExpense();
    testLoan();
    testApply();

    //afterEach(() => {

    //});
});

function testExpense() {

    it('提交日常报销单cy.createSaveFlow()', () => {
      const session = JSON.parse(localStorage.getItem('session'))
      const corpId = session.user.corpId
      const userId = session.user.userId
      const title = 'e2e测试单' + rand.makeid(5);
          const userCustom = {
            "req":{
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
                        "consumptionReasons": "打车",
                        "attachments": []
                      }
                    }],
                    "specificationId": specificationId
                  }
              }
          }
           cy.log(JSON.stringify(userCustom))
           cy.createSaveFlow(corpId,userCustom)
           .then(response => {
            expect(cy.flowId).not.to.eq(undefined)
           })
    });


}
function testLoan() {
  it('提交借款单cy.createSaveFlow()', () => {
    const session = JSON.parse(localStorage.getItem('session'))
    const corpId = session.user.corpId
    const userId = session.user.userId
    const title = 'e2e借款单' + rand.makeid(5);
    const userCustom = {
      "req": {
        "name": "freeflow.edit",
        "form": {
          "title": title,
          "submitterId": `${corpId}:${userId}`,
          "submitDate": dayjs().valueOf(),
          "repaymentDate": dayjs().add(7, 'day').valueOf(),
          "description": "这是cypress e2e测试",
          "payeeId": payeeId,
          "loanMoney": {
            "standard": "1000.00",
            "standardNumCode": "156",
            "standardScale": 2,
            "standardStrCode": "CNY",
            "standardSymbol": "¥",
            "standardUnit": "元"
          },
          "loanDepartment": corpId,
          "loanDate": dayjs().valueOf(),
          "specificationId": loanSpecificationId,
          "attachments": [{
            "fileId": "LEk9mDMiZAb800",
            "fileName": "专业版-hotfix-2019-05-25到2019-06-25的副本.xlsx",
            "key": "专业版-hotfix-2019-05-25到2019-06-25的副本-1561968730584-981.xlsx"
          }]
        }
      }
    }
    cy.log(JSON.stringify(userCustom))
    cy.createSaveFlow(corpId,userCustom)
    .then(response => {
      cy.log(response)
      expect(cy.flowId).not.to.eq(undefined)
    })
  });
}

function testApply() {
  it('提交申请单cy.createSaveFlow()', () => {
    const session = JSON.parse(localStorage.getItem('session'))
    const corpId = session.user.corpId
    const userId = session.user.userId
    const title = 'e2e申请单' + rand.makeid(5);
    const userCustom = {
      "req": {
        "name": "freeflow.edit",
        "form": {
          "title": title,
          "requisitionDate": dayjs().valueOf(),
          "submitterId": `${corpId}:${userId}`,
          "expenseDepartment": corpId,
          "description": "这是cypress e2e测试",
          "details": [{
            "feeTypeId": reqFeeTypeId,
            "specificationId": reqExpenseSpecificationId,
            "feeTypeForm": {
              "amount": {
                "standard": "123",
                "standardStrCode": "CNY",
                "standardNumCode": "156",
                "standardSymbol": "¥",
                "standardUnit": "元",
                "standardScale": 2
              },
              "consumptionReasons": "餐饮",
              "attachments": [{
                "fileId": "g8M9lD0cEwr400",
                "fileName": "创建监控器（PostMan）.pdf",
                "key": "创建监控器（PostMan）-1561698246348-87.pdf"
              }]
            }
          }],
          "specificationId": reqSpecificationId
        }
      }
    }
    cy.log(JSON.stringify(userCustom))
    cy.createSaveFlow(corpId,userCustom)
    .then(response => {
      cy.log(response)
      expect(cy.flowId).not.to.eq(undefined)
    })
  });
}

