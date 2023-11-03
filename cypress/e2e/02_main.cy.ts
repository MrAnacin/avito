describe('The main page of the application', () => {
  it('should display navigation', () => {
    cy.visit('/')
    cy.get('button').contains('Найти').should('exist')
  })

  it('should display search bar', () => {
    cy.visit('/')
    cy.get('form').should('exist')
    cy.get('form').within(() => {
      cy.root().find('input').should('have.length', 1)
      cy.root().find('input').should('have.value', '')
      cy.root().find('button').should('have.length', 1)
    })
  })

  it('should display title', () => {
    cy.visit('/')
    cy.get('h1').contains('Объявления').should('exist').as('ButtonReturn')

    cy.get('@ButtonReturn').click()
  })
})
