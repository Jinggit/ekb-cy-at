// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
//不需要UI登录进行自定义命令测试

describe('自定义命令测试', () => {
  beforeEach(() => {
    //通过API请求进行登录操作
    cy.clearCookies()
    cy.login({userType:"userA"})
      .chooseCorporation()
      .initLanguage()
  });

  //测试用例
  tests();

  //afterEach(() => {

  //});
});

function tests() {

  it('测试自定义命令cy.getFeeTypes()', () => {
      cy.getFeeTypes('打车')
        .then(response => {
        expect(cy.feeTypeId).not.to.eq(undefined) 
        expect(cy.expenseSpecificationId).not.to.eq(undefined)
      })

  });


}