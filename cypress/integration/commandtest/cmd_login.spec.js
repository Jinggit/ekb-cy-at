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

  it('测试自定义命令cy.login()', () => {        
      //通过API请求进行登录操作
      cy.clearCookies()
      cy.login({userType:"userB"})
        .then(response => {
          expect(response.body).not.have.property('errorCode')
      })

  });

  it('测试自定义命令cy.login()', () => {        
    //通过API请求进行登录操作
    cy.login({userType:"userB", cropId:"corpB"})
      .then(response => {
        expect(response.body).not.have.property('errorCode')
    })

});

  it('测试自定义命令cy.login()', () => {
      cy.login()
        .then(response => {
          expect(response.body).not.have.property('errorCode')
        })
  });

  
  it('测试自定义命令cy.login()', () => {
        const userCustom = {
          "userType": {
             "fullPhone": "86-15710575587",
             "password": "1234567",
             "isShortTermToken": "false",
             "deviceId": "468E13B5-40D2-4A4F-B08E-2914B21DBCC9",
             "deviceType": "DESKTOP"
             }
         }

         cy.login(userCustom)
         .then(response => {
           expect(response.body).have.property('error',true)
         })
  });


}