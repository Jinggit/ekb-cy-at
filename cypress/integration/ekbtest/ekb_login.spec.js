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
    beforeEach(() => {
        u.getNavigatorLanguages()
        cy.clearCookies()
        cy.visit('/web/app.html?accessToken=#/login5')
        cy.get('.ant-tabs-tab-active').should('be.visible')
        cy.waitLoadingMarkDisappear();
    });

    //测试用例
    tests();

    //afterEach(() => {

    //});
});

function tests() {
    it('使用存在的用户登录测试', () => {
        //UI操作登录
        loginWithPhone();
        //检查企业
        cy.get('.corporation-item').first().should('be.visible');
        //通过UI操作登出
        cy.get('.base-register-title-logout').click();
        cy.get('.ant-btn-primary').click();
    });

    it('使用不存在的用户登录测试', () => {
        //UI操作登录
        loginWithNoExsitPhone();
        //检查包含文本
        cy.url().should('include','login');
        cy.contains('用户不存在').should('be.visible');
    });

}

function loginWithPhone() {
    //输入国家号
    cy.xpath('//*[@id="areaCode"]').select('86', { force: true });
    //'输入手机号'
    cy.get('#cellphone')
      .should('be.visible')
      .type(Cypress.env('PHONE_USER_B'));
    //输入密码
    cy.get('#password')
      .should('be.visible')
      .type(Cypress.env('PASSWORD_USER_B'));
    //点击登录
    cy.get('.ant-btn')
      .should('be.visible')
      .click();
}

function loginWithNoExsitPhone() {
    //输入国家号
    cy.xpath('//*[@id="areaCode"]').select('86', { force: true });
    //'输入手机号'
    cy.get('#cellphone')
      .should('be.visible')
      .type('15700000000');
    //输入密码
    cy.get('#password')
      .should('be.visible')
      .type('123456');
    //点击登录
    cy.get('.ant-btn')
      .should('be.visible')
      .click();
}