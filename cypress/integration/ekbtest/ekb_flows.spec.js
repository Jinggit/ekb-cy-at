// *************************************************** ************
//history
//Author
//editor
//Version
// *************************************************** ************
//Do not need UI login for end-to-end test of document page
import 'cypress-xpath';
import * as rand from '../../utils/Rand';
import LeftMenu from '../pages/left_menu';
import NewFlow from '../pages/flow_form';
import SelectCorp from '../pages/select_corp';

describe('document test', () => {

    beforeEach(() => {
        //Login operation through API request
        cy. clearCookies()
        cy.login({userType: "userA"})
          .chooseCorporation()
          .initLanguage()
        //select company
        const selectcorp = new SelectCorp();
        selectcorp.selectEnterprise(Cypress.env('CORPNAME_USER_A'))
    });

    // collection of test cases
    //Test to add daily reimbursement form - the consumption record is not empty
    //Test to add a daily reimbursement form - the consumption record is empty
    testExpense();

    //Test to add a loan slip - the loan amount is not empty
    //Test to add a loan slip - the loan amount is empty
    testLoan();

    //Test to add application form - consumption record is empty
    testApply();

    afterEach(() => {
        //Exit operation through API request
        cy. logout();
    });
});

function testExpense() {

    it('Test to add daily reimbursement form - the consumption record is not empty', function() {
        // Prepare the test data in the form
        const title = 'cy reimbursement' + rand.makeid(5);
        const specification = 'cy daily reimbursement form'

        //Enter my document page
        const leftmenu = new LeftMenu();
        leftmenu.showMenu();
        leftmenu.goToMy();
        leftmenu.goToMyFlow();
        cy. waitLoadingMarkDisappear();
        //New document
        const flow = leftmenu.createNewFlow();
        // select reimbursement form
        flow.chooseFlowSepcification(specification)
        //Please select payment information
        flow.choosePayerInfo()
        //Please enter a description
        flow. inputDesc()
        //Please enter a title
        flow. inputTitle(title)
        //Add fee details
        flow. addDetails()
        //Submit documents
        flow. submitForm();


    });

    it('Test to add daily reimbursement form - the consumption record is empty.', function() {
        const title = 'cypress reimbursement' + rand.makeid(5);
        cy.get('[data-cy=bills-createBills]').click();
        cy.contains('daily reimbursement form').click();
        cy. waitLoadingMarkDisappear();
        cy.xpath('//*[@class="ant-input ant-input-lg"]').type(title);//*[@placeholder="Please enter the title"]
        cy.xpath('//*[@placeholder="Please select payment information"]').click();
        cy.xpath('//*[@class="ant-btn mr-10 ant-btn-primary ant-btn-lg"]').click();//Confirm
        cy.xpath('//*[@placeholder="(optional) please enter a description"]')
          .type('Jing Guanhua{enter}')
          .type('Hesi{enter}')
          .type('QA{enter}');
        cy.contains('submit').click();
        cy.contains('Consumption records cannot be empty').should('be.visible');
    });



}

function testLoan() {

    it('Test to add a loan slip - the loan amount is not empty', function() {
        const title = 'cypress loan' + rand.makeid(5);
        cy.get('[data-cy=bills-createBills]').click()
        cy.xpath('//*[text()="Loan slip"]').click();
        //cy.xpath('//*[@class="modal-content-new"]/div/div/div[@class="children"]').contains(/^Debit $/).click ();
        cy. waitLoadingMarkDisappear();
        cy.xpath('//*[@placeholder="Please enter the title"]').type(title);
        cy.xpath('//*[contains(@class,"currency-money")]//input').type('158',{force: true});//*[@placeholder="Please enter Amount"]
        cy.xpath('//*[@placeholder="(optional) please enter a description"]')
          .type('Jing Guanhua{enter}')
          .type('Hesi{enter}')
          .type('QA{enter}');
        cy.contains('submit').click();
        cy.contains('.modal-footer > .ant-btn-primary', 'submit').click();
        cy.contains('document submission').should('be.visible');
        cy.contains('success').should('be.visible');
    });

    it('Test to add a loan note - the loan amount is empty', function() {
        const title = 'cypress loan' + rand.makeid(5);
        cy.get('[data-cy=bills-createBills]').click();
        cy.xpath('//*[text()="Loan slip"]').click();
        //cy.xpath('//*[@class="modal-content-new"]/div/div/div[@class="children"]').contains(/^Debit $/).click ();
        cy. waitLoadingMarkDisappear();
        cy.xpath('//*[@placeholder="Please enter the title"]').type(title);
        cy.xpath('//*[@placeholder="(optional) please enter a description"]')
          .type('Jing Guanhua{enter}')
          .type('Hesi{enter}')
          .type('QA{enter}');
        cy.contains('submit').click();
        cy.contains('The loan amount cannot be empty').should('be.visible');
    });

}

function testApply() {

    it('Test to add application form - consumption record is not empty', function() {
        const title = 'cypress application' + rand.makeid(5);
        cy.get('[data-cy=bills-createBills]').click()
        cy.xpath('//*[text()="application form"]').click();
        //cy.xpath('//*[@class="modal-content-new"]/div/div/div[@class="children"]').contains(/^application $/).click ();
        cy. waitLoadingMarkDisappear();
        cy.xpath('//*[@placeholder="Please enter the title"]').type(title);
        cy.xpath('//*[@placeholder="(optional) please enter a description"]')
          .type('Jing Guanhua{enter}')
          .type('Hesi{enter}')
          .type('QA{enter}');
        cy.get('.import-detail').click();
        cy.get('.type-name').click();
        cy.contains('Communication').click();
        cy. waitLoadingMarkDisappear();
        cy.xpath('//*[contains(@class,"currency-money")]//input').type('158',{force: true});//*[@placeholder="Please enter Amount"]
        cy.contains('.ant-btn-primary', 'Save').click();
        cy.contains('submit').click();
        cy.contains('.modal-footer > .ant-btn-primary', 'submit').click();
        cy.contains('document submission').should('be.visible');
        cy.xpath('//*[@class="followWeChat-footer"]/*[@class="ant-btn ant-btn-primary"]').click();
        cy.contains('success').should('be.visible');
    });

   it('Test to add application form - consumption record is empty', function() {
         const title = 'cypress application' + rand.makeid(5);
         cy.get('[data-cy=bills-createBills]').click();
         cy.xpath('//*[text()="application form"]').click();
         //cy.get('.children').contains(/^application $/).click();
         cy.xpath('//*[@placeholder="(optional) please enter a description"]')
           .type('Jing Guanhua{enter}')
           .type('Hesi{enter}')
           .type('QA{enter}');
           cy.xpath('//*[@placeholder="Please enter the title"]').type(title);
         cy.contains('submit').click();
         cy.contains('Consumption records cannot be empty').should('be.visible');
     });

}

