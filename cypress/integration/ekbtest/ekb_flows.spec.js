// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
//不需要UI登录进行单据页面的端到端测试
import 'cypress-xpath';
import * as rand from '../../utils/Rand';
import { selectEnterprise } from './page_resources';
import Header from '../pages/left_menu';
import LeftMenu from '../pages/left_menu';
import NewFlow from '../pages/flow_form';

describe('单据测试', () => {
    beforeEach(() => {
        //通过API请求进行登录操作
        cy.clearCookies()
        cy.login({userType:"userA"})
          .chooseCorporation()
          .initLanguage()
        selectEnterprise();
        //workaround: refresh page to fix locale issue
        //cy.reload()
        cy.waitLoadingMarkDisappear();
    });

    //测试用例集合
    //测试添加日常报销单-消费记录不为空
    //测试添加日常报销单-消费记录为空
    testExpense();
    //测试添加借款单-借款金额不为空
    //测试添加借款单-借款金额为空
    testLoan();
    //测试添加申请单-消费记录为空
    testApply();

    afterEach(() => {
        //通过API请求进行退出操作
        cy.logout();
    });
});

function testExpense() {

    it('测试添加日常报销单-消费记录不为空', () => {
        //准备表单中的测试数据
        const title = 'cypress报销' + rand.makeid(5);
        //进入我的单据页面
        const leftmenu = new LeftMenu();
        leftmenu.showMenu();
        leftmenu.goToMy();
        leftmenu.goToMyFlow();
        //新建单据
        const flow = leftmenu.createNewFlow()

        cy.contains('日常报销单').click();
        cy.waitLoadingMarkDisappear();
        cy.xpath('//*[@class="ant-input ant-input-lg"]').type(title);//*[@placeholder="请输入标题"]
        cy.xpath('//*[@placeholder="请选择收款信息"]').click();
        cy.xpath('//*[@class="ant-btn mr-10 ant-btn-primary ant-btn-lg"]').click();//确 认
        cy.xpath('//*[@placeholder="（选填）请输入描述"]')
          .should('be.visible')
          .type('景冠华{enter}')
          .type('合思{enter}')
          .type('QA{enter}');
        cy.get('.import-detail').click();
        cy.get('.type-name').click();
        cy.contains('住宿').click();
        cy.waitLoadingMarkDisappear();
        cy.xpath('//*[contains(@class,"currency-money")]//input').type('158',{force: true});//*[@placeholder="请输入金额"]
        cy.xpath('//*[@class="ant-btn btn-ml ant-btn-primary"]').click();
        cy.contains('提 交').click();
        cy.contains('继 续').click();
        cy.contains('.modal-footer > .ant-btn-primary','提 交').click();
        cy.contains('单据提交中').should('be.visible');
        cy.contains('成功').should('be.visible');
    });

    it('测试添加日常报销单-消费记录为空.', () => {
        const title = 'cypress报销' + rand.makeid(5);
        cy.get('[data-cy=bills-createBills]').click();
        cy.contains('日常报销单').click();
        cy.waitLoadingMarkDisappear();
        cy.xpath('//*[@class="ant-input ant-input-lg"]').type(title);//*[@placeholder="请输入标题"]
        cy.xpath('//*[@placeholder="请选择收款信息"]').click();
        cy.xpath('//*[@class="ant-btn mr-10 ant-btn-primary ant-btn-lg"]').click();//确 认
        cy.xpath('//*[@placeholder="（选填）请输入描述"]')
          .type('景冠华{enter}')
          .type('合思{enter}')
          .type('QA{enter}');
        cy.contains('提 交').click();
        cy.contains('消费记录不能为空').should('be.visible');
    });



}

function testLoan() {

    it('测试添加借款单-借款金额不为空', () => {
        const title = 'cypress借款' + rand.makeid(5);
        cy.get('[data-cy=bills-createBills]').click()
        cy.xpath('//*[text()="借款单"]').click();
        //cy.xpath('//*[@class="modal-content-new"]/div/div/div[@class="children"]').contains(/^借款单$/).click();
        cy.waitLoadingMarkDisappear();
        cy.xpath('//*[@placeholder="请输入标题"]').type(title);
        cy.xpath('//*[contains(@class,"currency-money")]//input').type('158',{force: true});//*[@placeholder="请输入金额"]
        cy.xpath('//*[@placeholder="（选填）请输入描述"]')
          .type('景冠华{enter}')
          .type('合思{enter}')
          .type('QA{enter}');
        cy.contains('提 交').click();
        cy.contains('.modal-footer > .ant-btn-primary','提 交').click();
        cy.contains('单据提交中').should('be.visible');
        cy.contains('成功').should('be.visible');
    });

    it('测试添加借款单-借款金额为空', () => {
        const title = 'cypress借款' + rand.makeid(5);
        cy.get('[data-cy=bills-createBills]').click();
        cy.xpath('//*[text()="借款单"]').click();
        //cy.xpath('//*[@class="modal-content-new"]/div/div/div[@class="children"]').contains(/^借款单$/).click();
        cy.waitLoadingMarkDisappear();
        cy.xpath('//*[@placeholder="请输入标题"]').type(title);
        cy.xpath('//*[@placeholder="（选填）请输入描述"]')
          .type('景冠华{enter}')
          .type('合思{enter}')
          .type('QA{enter}');
        cy.contains('提 交').click();
        cy.contains('借款金额不能为空').should('be.visible');
    });

}

function testApply() {

    it('测试添加申请单-消费记录不为空', () => {
        const title = 'cypress申请' + rand.makeid(5);
        cy.get('[data-cy=bills-createBills]').click()
        cy.xpath('//*[text()="申请单"]').click();
        //cy.xpath('//*[@class="modal-content-new"]/div/div/div[@class="children"]').contains(/^申请单$/).click();
        cy.waitLoadingMarkDisappear();
        cy.xpath('//*[@placeholder="请输入标题"]').type(title);
        cy.xpath('//*[@placeholder="（选填）请输入描述"]')
          .type('景冠华{enter}')
          .type('合思{enter}')
          .type('QA{enter}');
        cy.get('.import-detail').click();
        cy.get('.type-name').click();
        cy.contains('通讯').click();
        cy.waitLoadingMarkDisappear();
        cy.xpath('//*[contains(@class,"currency-money")]//input').type('158',{force: true});//*[@placeholder="请输入金额"]
        cy.contains('.ant-btn-primary','保 存').click();
        cy.contains('提 交').click();
        cy.contains('.modal-footer > .ant-btn-primary','提 交').click();
        cy.contains('单据提交中').should('be.visible');
        cy.xpath('//*[@class="followWeChat-footer"]/*[@class="ant-btn ant-btn-primary"]').click();
        cy.contains('成功').should('be.visible');
    });

    it('测试添加申请单-消费记录为空', () => {
        const title = 'cypress申请' + rand.makeid(5);
        cy.get('[data-cy=bills-createBills]').click();
        cy.xpath('//*[text()="申请单"]').click();
        //cy.get('.children').contains(/^申请单$/).click();
        cy.xpath('//*[@placeholder="（选填）请输入描述"]')
          .type('景冠华{enter}')
          .type('合思{enter}')
          .type('QA{enter}');
          cy.xpath('//*[@placeholder="请输入标题"]').type(title);
        cy.contains('提 交').click();
        cy.contains('消费记录不能为空').should('be.visible');
    });

}

