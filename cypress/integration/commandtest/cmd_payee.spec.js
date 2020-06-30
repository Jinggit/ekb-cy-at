// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
//不需要UI登录进行自定义命令测试

describe('自定义命令测试', () => {
  beforeEach(() => {
    cy.clearCookies()
    //通过API请求进行登录操作
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

  it('测试自定义命令cy.getSpecificationGroups()', () => {
      cy.getSpecificationGroups('日常报销单')
        .then(response => {
        expect(cy.specificationId).not.to.eq(undefined) 
        expect(cy.expflowPlanConfigId).not.to.eq(undefined)
      })

  });


}