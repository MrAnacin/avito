import { USER_EMAIL, USER_PASSWORD } from '../support/constants'

describe('Create product modal', () => {
  it('should display create modal', () => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('nav[data-cy="navigation"]').should('exist').as('Navigation')
    cy.get('@Navigation').within(() => {
      cy.root()
        .find('button')
        .contains('Разместить объявление')
        .as('Button')
        .should('exist')

      cy.get('@Button').click()
    })

    cy.get('form[data-cy="create-modal"]').as('Modal').should('exist')
    cy.get('@Modal').within(() => {
      cy.root().find('input').should('have.length', 7)
      cy.root().find('textarea').should('have.length', 1)
      cy.root().find('button').should('have.length', 1)
      cy.root().find('button').contains('Опубликовать').should('exist')
    })
  })

  it('should create and delete product', () => {
    cy.createProduct()

    cy.root()
      .find('button')
      .contains('Снять с публикации')
      .should('exist')
      .as('Button')
    cy.get('@Button').click()
    cy.location('pathname').should('eq', '/profile')
  })
})
