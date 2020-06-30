// ***********************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************

import { get } from 'lodash'
import * as rand from '../utils/Rand';

Cypress.Commands.add('getSpecificationGroups', (specificationName) => {
  const session = JSON.parse(localStorage.getItem('session'))
  const corpId = session.user.corpId

  //API请求  
  cy.request({
    url: Cypress.env('SPECIFICATIONGROUPS_URI')+corpId,
    method: 'GET',
  }).then(response => {
    cy.log(response.body)
    getSpecificationId(response, specificationName);
  });

});

function getSpecificationId(response, specificationName) {
  const items = response.body.items;
  for (var i=0;i<items.length; i++) {
      var specifications = items[i].specifications
      for (var j=0;j<specifications.length; j++){
        if( specifications[j].name === specificationName){
          cy.specificationId = specifications[j].id;
          cy.expflowPlanConfigId =  specifications[j].configs[1].flowPlanConfigId;
        }
      }
  }
}