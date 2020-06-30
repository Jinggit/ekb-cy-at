/// <reference types="cypress" />

// typically custom commands are added in this support folder
// so it makes sense to put their TypeScript definitions here
// from the JavaScript specs loads this file using
// the triple slash "reference" comment like this:
//
// /// <reference path="../support/index.d.ts" />

declare namespace Cypress {
    interface Chainable {
      /**
       * 自定义命令登录.
      
       * @example 
       * 固定用户帐户
       * cy.login()
       * cy.login({userAccount:"userA", cropId:"corpA"})
       
       * @example 
       * 自定义用户数据
       * cy.login(userCustom)
       * const userCustom = {
         "userAccount": {
            "fullPhone": "86-15710575586",
            "password": "1234567",
            "isShortTermToken": "false",
            "deviceId": "468E13B5-40D2-4A4F-B08E-2914B21DBCC9",
            "deviceType": "DESKTOP"
            },
         "cropId": {
             "corpId":"asdaskljklasd"
            }
        }
      */
     login({userAccount: string, cropId: string}): Chainable<Element>
    }
    interface Chainable {
        /**
         * Custom command to logout.
         * @example cy.logout()
        */
       logout(): Chainable<Element>
      }
  }