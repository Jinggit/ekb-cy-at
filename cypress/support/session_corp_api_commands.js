// ***********************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************

import { get } from 'lodash'
import { initLangData } from '../utils/utils'
import I18n from '../utils/i18n'

//登录请求
Cypress.Commands.add('login', ({userType = 'userA'} = {}) => {

  //固定数据
    const fixedData = {
        userA: {
            "fullPhone": Cypress.env('FULLPHONE_USER_A'),
            "password": Cypress.env('PASSWORD_USER_A'),
            "isShortTermToken": Cypress.env('ISSHORTTERMTOKEN_USER_A'),
            "deviceId": Cypress.env('DEVICEID_USER_A'),
            "deviceType": Cypress.env('DESKTOP_USER_A')
        },
        userB: {
          "fullPhone": Cypress.env('FULLPHONE_USER_B'),
          "password": Cypress.env('PASSWORD_USER_B'),
          "isShortTermToken": Cypress.env('ISSHORTTERMTOKEN_USER_B'),
          "deviceId": Cypress.env('DEVICEID_USER_B'),
          "deviceType": Cypress.env('DESKTOP_USER_B')
        }
    };

    //处理固定数据或自定义数据

      let body = {}
      if (typeof userType === 'string' && fixedData[userType]) {
        body = fixedData[userType]
      }
      if (typeof userType === 'object') {
        body = userType
      }
    

   //API请求
    cy.request({
        url: Cypress.env('LOGINBYONE_URI'),
        method: 'POST',
        body
    }).then(response => {
        cy.userId = response.body.userId
        cy.accessToken = response.body.token
      });

});

//登出请求
Cypress.Commands.add('logout', () => {
    const session = JSON.parse(localStorage.getItem('session'))
    if (session && session.user.corpId) {
      cy.request('DELETE', Cypress.env('SESSION_URI'), {
        corpId: session.user.corpId
      }).then(response => {
        localStorage.removeItem('session')
      })
    }
  })

//选择企业请求
Cypress.Commands.add('chooseCorporation', ({cropId = 'corpA'} = {}) => {
    const fixedData = {
        corpA: {
            "corpId":Cypress.env('CORPID_USER_A')
        },
        corpB: {
          "corpId":Cypress.env('CORPID_USER_B')
        }
    }

    let comCropId = ''
    if (typeof cropId === 'string' && fixedData[cropId]) {
      comCropId = fixedData[cropId]
    } else {
      comCropId = cropId
    }

    const makeStr = comCropId.corpId

    if (makeStr) {
      cy.request('GET', Cypress.env('GET_CORPORATION_URI'),{})
        .then(response => {
        const aItems = response.body.items
        if (aItems.length) {
          const oCor = aItems.filter(item => {
            if (item.name === makeStr || item.id === makeStr) {
              return item
            }
          })

          if (oCor && oCor.length) {
            const session = {
              user: {
                accessToken: cy.accessToken,
                corpId: oCor[0].id,
                userId: cy.userId
              }
            }

            localStorage.setItem('session', JSON.stringify(session))
          }else{
            localStorage.setItem('session', '')
          }
        }
      })
    }
  })

//初始化语言请求
Cypress.Commands.add('initLanguage', () => {
    const session = JSON.parse(localStorage.getItem('session'))
    const corpId = session.user.corpId
    cy.request('GET', Cypress.env('GET_STAFFSETTING_URI')+corpId).then(response => {
        const language = get(response, 'body.value.language')
        localStorage.setItem('lang', language)
        getLanguage(corpId, language).then(response => {
            const data = response.body
            window.i18n = new I18n(initLangData(data))
            console.log(window.i18n)
      })
    })
  })

//获得语言请求
  const getLanguage = (corpId, language) => {
    switch (language) {
      case 'en-US':
        return cy.request('GET', Cypress.env('GET_ENUS_LANGAGE_URI')+corpId)
        break;
      case 'zh-CN':
        return cy.request('GET', Cypress.env('GET_ZHCN_LANGAGE_URI')+corpId)
        break;
  }
}

  //等待加载条消失
  Cypress.Commands.add('waitLoadingMarkDisappear', () => {
      cy.contains('.ant-message-custom-content > span',{timeout: 60000}).should('not.be.visible');
    })