export function selectEnterprise() {
    cy.visit(Cypress.env('SELECTENTERPRISE_URI'));
    cy.waitLoadingMarkDisappear()
    cy.xpath('//*[@class="corporation-item"]').first().should('be.visible').click();
    cy.waitLoadingMarkDisappear()
    cy.xpath('//*[@class="ant-btn enter-corp-button"]').first().should('be.visible').click();
    cy.waitLoadingMarkDisappear()
}
