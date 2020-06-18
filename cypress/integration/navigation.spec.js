context('Navigation', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })
  it('should navigate correctly', () => {
    cy.get('[data-testid="render-link"]').click()
    cy.get('span').should('have.text', 'Hey, stranger')
    cy.get('[data-testid="toggle-link"]').click()
    cy.get('button').should('exist')
    cy.get('[data-testid="customer-link"]').click()
    cy.get('[data-testid="form"]').should('exist')
    cy.get('[data-testid="address-link"]').click()
    cy.get('[data-testid="cep"]').should('exist')
    // cy.screenshot()
    // cy.writeFile('message.txt', 'Hello World')
    // cy.readFile('message.txt').then((text) => {
    //   expect(text).to.equal('Hello World') // true
    // })
  })
});