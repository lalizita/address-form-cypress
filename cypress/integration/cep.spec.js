import "cypress-localstorage-commands"

context('CEP', () => {
  before(() => {
    cy.visit('http://localhost:3000/form-cep')
  })
  it('should not show alert address with empty field', () => {
    cy.get('[data-testid="submit-address"]').click()
    cy.get('[data-testid="error-bairro"]').should('have.text', 'campo bairro obrigatório')
  })
  it('should return address', () => {
    addressRequest()
    cy.get('[data-testid="cep"]').type('01508010')
    cy.wait('@resAddress')
    cy.get('[data-testid="bairro"]').should('have.value', 'Jardim das rosas')
    cy.get('[data-testid="logradouro"]').should('have.value', 'Rua Julieta')
    cy.get('[data-testid="submit-address"]').click()
    cy.fixture('address.json').then((address) => {
      cy.setLocalStorage('address', JSON.stringify(address))
      cy.saveLocalStorage();
    })
  })
  it('should address be in the localstorage', () => {
    cy.restoreLocalStorage();
    cy.fixture('address.json').then((address) => {
      cy.getLocalStorage('address').then(addressStorage => {
        expect(addressStorage).to.eq(JSON.stringify(address))
      })
    })
  })
  // addressRequest()
  // cy.get('[data-testid="cep"]').type('01508010')
  // cy.wait('@resAddress')
  // cy.get('[data-testid="bairro"]').should('have.value', 'Jardim das rosas')
  // cy.get('[data-testid="logradouro"]').should('have.value', 'Rua Julieta')
  // cy.get('[data-testid="submit-address"]').click()
})

const addressRequest = () => {
  cy.server()
  cy.route({
    method: 'GET',
    url: `https://viacep.com.br/ws/01508010/json`,
    response: 'fixture:address.json'
  }).as('resAddress')
}