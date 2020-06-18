context('CEP', () => {
  before(() => {
    cy.visit('http://localhost:3000/form-cep')
  })
  it('should return cep', () => {
    addressRequest()
    cy.get('[data-testid="cep"]').type('01508010')
    cy.wait('@resAddress')
    cy.get('[data-testid="bairro"]').should('have.value', 'Jardim das rosas')
    cy.get('[data-testid="logradouro"]').should('have.value', 'Rua Julieta')
  })
})

const addressRequest = () => {
  cy.server()
  cy.route({
    method: 'GET',
    url: `https://viacep.com.br/ws/01508010/json`,
    // response: 'fixture:address.json'
  }).as('resAddress')
}