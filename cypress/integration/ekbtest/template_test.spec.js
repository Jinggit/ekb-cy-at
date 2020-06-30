// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
//不需要UI登录进行单据页面的端到端测试
import 'cypress-xpath';
import * as rand from '../../utils/Rand';

describe('测试描述信息', () => {
    beforeEach(() => {
        //通过API请求进行登录操作
        cy.clearCookies()
        cy.login({userType:"userA"})
          .chooseCorporation()
          .initLanguage()
    });

    //测试用例
    tests();

    afterEach(() => {
        //通过API请求进行退出操作
        //cy.logout();
    });
});

function tests() {

    it('测试描述信息', () => {

    });




}

