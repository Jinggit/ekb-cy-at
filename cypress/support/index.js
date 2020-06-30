// ***********************************************************
//编写历史
//创建者
//更改者
//版本
// ***********************************************************
import './session_corp_api_commands'
import './flow_api_commands'
import './payee_api_commands'
import './fee_api_commands'
import './specification_api_commands'


//测试报告中插入错误截图
const addContext = require('mochawesome/addContext')

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
        addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
    }
})