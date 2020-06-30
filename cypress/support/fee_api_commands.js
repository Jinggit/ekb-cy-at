// ***********************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************

import { get } from 'lodash'
import * as rand from '../utils/Rand';

Cypress.Commands.add('getFeeTypes', (feeTypesName) => {
  const session = JSON.parse(localStorage.getItem('session'))
  const corpId = session.user.corpId

  //API请求  
  cy.request({
    url: Cypress.env('FEETYPE_URI')+corpId,
    method: 'GET',
  }).then(response => {
    cy.log(response.body)
    getFeeTypeId(response, feeTypesName);
  });

});

function getFeeTypeId(response, feeTypesName) {
  const items = response.body.items;
  for (var i = 0; i < items.length; i++) {
    if (items[i].feeType.name === feeTypesName) {
      cy.feeTypeId = items[i].feeType.id;
      cy.expenseSpecificationId = items[i].feeType.expenseSpecificationId;
      cy.requisitionSpecificationId = items[i].feeType.requisitionSpecificationId;
    }
  }
}
