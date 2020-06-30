// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
//通过UI操作登录
import 'cypress-xpath';
import * as u  from '../../utils/utils';

describe('通过UI操作登录测试', () => {

    //测试前置处理部分
    beforeEach(() => {
        u.getNavigatorLanguages()
        cy.clearCookies()
        cy.visit('/web/app.html?accessToken=#/login5')
        cy.get('.ant-tabs-tab-active').should('be.visible')
        cy.waitLoadingMarkDisappear();
    });

    //测试用例描述部分
    tests();

    //测试后置处理部分
    //afterEach(() => {

    //});
});

function tests() {
  it('登录-数据驱动测试', () => {
    const testdatas = [
      {test_desc:'密码错误，失败', areaCode: '86', cellphone: '15710575586', password: '1234567',  expectedMessage: '错误'},
      {test_desc:'用户不存在，失败', areaCode: '86', cellphone: '15700000000', password: '123456',  expectedMessage: '用户不存在'},
    ]
    cy.wrap(testdatas)
      .each(testdata => {
        cy.log(testdata.test_desc)
        cy.contains('Loading',{timeout: 10000}).should('not.be.visible')
        loginWithPhone(testdata.areaCode, testdata.cellphone, testdata.password)
        cy.contains(testdata.expectedMessage)
        cy.reload()
      })
  })


}

function loginWithPhone(areaCode,cellphone,password) {
    //输入国家号
    cy.xpath('//*[@id="areaCode"]').select(areaCode, { force: true }); //{ force: true } 在操作之前忽略错误检查，不管元素是否可见、是否disable
    //'输入手机号'
    cy.waitLoadingMarkDisappear();
    cy.get('#cellphone')
      .should('be.visible')
      .type(cellphone, { force: true });
    //输入密码
    cy.get('#password')
      .should('be.visible')
      .type(password, { force: true });
    //点击登录
    cy.get('.ant-btn')
      .should('be.visible')
      .click();
}

