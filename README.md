# cypress测试框架


## cypress command扩展命令库
    {HOME}\cypress-ekb-e2e\cypress\support

## 测试用例
    command扩展命令对应的单元测试用例
    {HOME}\cypress-ekb-e2e\cypress\integration\commandtest
    e2e测试用例
    {HOME}\cypress-ekb-e2e\cypress\integration\ekbtest
    用例模板
    {HOME}\cypress-ekb-e2e\cypress\integration\ekbtest\template_test.spec.js
    环境常量
    {HOME}\ekb\cypress-ekb-e2e\cypress.env.json
    {HOME}\cypress-ekb-e2e\cypress.json

## 执行command扩展命令对应的单元测试用例
    node cypress_runner -b electron -s cmd_*.spec.js

## 执行e2e测试用例
    node cypress_runner -b electron -s ekb_*.spec.js

## 测试报告
    {HOME}\cypress-ekb-e2e\cypress\report\mochawesome-report\mochawesome.html

## 错误截图
    {HOME}\cypress-ekb-e2e\cypress\screenshots

## 视频录像
    {HOME}\cypress-ekb-e2e\cypress\videos

## 实践指南
    1、网页元素定位策略优先级
       定位元素策略按优先级排列，但不仅仅限制于一个策略，要根据情况优选：
            css selector +id，name，cy-data ；  
            xpath + class
            xpath + class contains()
            xpath + 文字
       cypress集成测试中的元素定位要规避长路径和索引值，这种在动态页面下会出现定位不稳定；
       自动化测试实际工作中总结出来的经验： 脚本不稳定投入的定位和修复成本大于脚本因为UI文字
       更新所投入的维护成本，毕竟文案不是天天在更新，所以在使用文字做定位策略时不必担心，而需要担
       心的是在动态的页面中如何保证自己使用的定位策略总能定位到唯一那个想去操作的元素；
    2、判断异步加载成功
       注意多数情况下元素操作失败可能的原因是"数据加载中,请稍候..."这个元素的异步出现，在操作
       元素之前调用cy.waitLoadingMarkDisappear()可以有效解决;
    3、关键问题解决与经验总结
       需配备经验丰富的架构师参与测试框架设计，关键问题解决和经验总结；
    4、测试用例管理
       建立e2e自动化测试用例仓库，建立master、dev、feature三个用例库分支结合项目迭代管理测试用例；
       使用Master用例库分支上的测试用例做Daily run回归测试线上环境；
       每次项目的Feature分支与项目的Dev分支合并时，自动触发Dev用例库分支的测试用例进行回归测试；
       在Feature用例库分支上增加或变更与本次项目迭代相关测试用例，开发人员可在自己本地编写、调试、执行测试用例，
       开发人员提交项目代码到项目的Feature分支，CICD触发Feature用例库分支的测试用例；
       每次项目的Feature分支与项目的Dev分支合并之前，不要忘记先把Feature用例库分支合并到Dev用例库分支，否则影响Dev环境回归测试；
       每次项目上线后，不要忘记把Dev用例库分支合并到master用例库，否则影响Daily run回归测试线上环境；
    5、测试用例管理评审
       项目上线后，Dev用例库分支合并到master用例库分支之前，开发人员应与架构师一起评审测试用例，保证master用例库上测试用例的质量；
    6、用例中的测试数据管理
       对于初始测试数据集保持只读，在cypress.env.json文件中管理;
       如果必须更改初始化数据，需要在用例退出时无论用例执行成功或失败进行原值恢复;
       特殊的测试数据单独管理；