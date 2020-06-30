// ***********************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************

import { get } from 'lodash'
import { initLangData } from '../utils/utils'
import I18n from '../utils/i18n'

//新建单据
//选择单据模板, 定制审批流程 定制单据模板 
////特殊类报销
////极速报销
////报销单模板
////日常报销单
////差旅报销单
////借款单模板
////借款单
////申请单模板
////差旅申请单
////申请单
//单据基础信息
//报销明细 - 添加消费 , 定制消费类型or行程类型
//关联申请
//核销借款
//保存
//提交

//新建保存单据
Cypress.Commands.add('createSaveFlow', (corpId, {req = 'defaultFlow'} = {}) => {

             
  //处理固定数据或自定义数据

    let body = {}
    if (typeof req === 'string' && fixedData[req]) {
      body = fixedData[req]
    }
    if (typeof req === 'object') {
      body = req
    }

  //API请求  
  cy.request({
    url: Cypress.env('FLOWEDIT_URI')+corpId,
    method: 'POST',
    body
  }).then(response => {
    //获取单据id
    cy.flowId = response.body.flow.id
    //获取单据title
    cy.flowFormTitle = response.body.flow.form.title
    //获取detailsId
    if (response.body.flow.form.details) {
      cy.flowFormDetails0DetailId = response.body.flow.form.details[0].feeTypeForm.detailId
    }
    //获取expenseFormCode
    cy.flowFormCode = response.body.flow.form.code
  });

});