// ***********************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************

import { get } from 'lodash'
import { initLangData } from '../utils/utils'
import I18n from '../utils/i18n'
import * as rand from '../utils/Rand';

Cypress.Commands.add('createPayee', ({req = 'defaultPayee'} = {}) => {
    //固定数据
    const fixedData = {
      defaultPayee: {
        "bank": "招商银行",
        "bankLinkNo": "308100005301",
        "branch": "招商银行股份有限公司北京世纪城支行",
        "cardNo": rand.makenum(10),
        "city": "北京市",
        "name": "张三",
        "owner": "INDIVIDUAL",
        "province": "北京市",
        "type": "PERSONAL"
    }
    };
             
  //处理固定数据或自定义数据

  let body = {}
  if (typeof req === 'string' && fixedData[req]) {
    body = fixedData[req]
  }
  if (typeof req === 'object') {
    body = req
  }

  const session = JSON.parse(localStorage.getItem('session'))
  const corpId = session.user.corpId

  //API请求  
  cy.request({
    url: Cypress.env('PAYEE_URI')+corpId,
    method: 'POST',
    body
  }).then(response => {
    //获取payeeId
    cy.payeeId = response.body.id
  });

});