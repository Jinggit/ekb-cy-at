// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
//不需要UI登录进行自定义命令测试

describe('自定义命令测试', () => {
  //beforeEach(() => {

  //});

  //测试用例
  tests();

  //afterEach(() => {

  //});
});

function tests() {

   it('测试自定义命令cy.chooseCorporation()', () => {
    const userCustom = {
      "cropId": {
          "corpId":"asdaskljklasd"
         }
     }
    cy.login()
      .chooseCorporation(userCustom)
      .then(response => {
        expect(localStorage.getItem('session')).to.be.empty
        expect(response.body).not.have.property('errorCode')
      })
});

it('测试自定义命令cy.chooseCorporation()', () => {
  cy.login()
    .chooseCorporation()
    .then(response => {
      expect(localStorage.getItem('session')).to.not.empty
      expect(response.body).not.have.property('errorCode')
    })
    
});

it('测试自定义命令cy.chooseCorporation()', () => {
cy.login({userType:"userB"})
  .chooseCorporation({cropId:"corpB"})
  .then(response => {
    expect(localStorage.getItem('session')).to.not.empty
    expect(response.body).not.have.property('errorCode')
  })
  
});


}

