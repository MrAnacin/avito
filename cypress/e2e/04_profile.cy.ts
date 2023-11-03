import {
  USER_EMAIL,
  USER_PASSWORD,
  USER_NAME,
  USER_SURNAME,
  USER_CITY,
  USER_NEW_PHONE,
} from '../support/constants'

describe('The profile page of the application', () => {
  it('should display navigation', () => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('nav[data-cy="navigation"]').should('exist').as('Navigation')
    cy.get('@Navigation').within(() => {
      cy.root().find('button').should('have.length', 2)
      cy.root().find('button').contains('Разместить объявление').should('exist')
      cy.root().find('button').contains('Личный кабинет').should('exist')
    })
  })

  it('should redirect to main page', () => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('button')
      .contains('Вернуться на главную')
      .should('exist')
      .as('Button')
    cy.get('@Button').click()
    cy.location('pathname').should('eq', '/')
  })

  it('should display title with USER_NAME', () => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('h1')
      .contains(`Здравствуйте${USER_NAME ? `, ${USER_NAME}` : ''}!`)
      .should('exist')
    cy.get('h2').contains('Настройки профиля').should('exist')
    cy.get('h2').contains('Мои товары').should('exist')
  })

  it('should display settings form with user data', () => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('form').within(() => {
      cy.root().find('input').should('have.length', 4)
      cy.root().find('button').should('have.length', 2)

      cy.root()
        .find('input[data-cy="settings-name"]')
        .should('have.value', USER_NAME)
      cy.root()
        .find('input[data-cy="settings-surname"]')
        .should('have.value', USER_SURNAME)
      cy.root()
        .find('input[data-cy="settings-city"]')
        .should('have.value', USER_CITY)
    })
  })

  it('should change user name', () => {
    cy.changeUserSettings('name')
  })

  it('should change user surname', () => {
    cy.changeUserSettings('surname')
  })

  it('should change user city', () => {
    cy.changeUserSettings('city')
  })

  it('should change user phone', () => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('form').within(() => {
      cy.root()
        .find('button')
        .contains('Сохранить')
        .should('exist')
        .should('be.disabled')
        .as('Button')

      cy.root()
        .find('input[data-cy="settings-phone"]')
        .as('Input')
        .should('have.value', '')

      cy.get('@Button').should('be.disabled')

      cy.get('@Input').type(USER_NEW_PHONE).should('have.value', USER_NEW_PHONE)

      cy.get('@Button').should('not.be.disabled')
      cy.get('@Button').click()

      cy.get('@Input').should('have.value', USER_NEW_PHONE)
      cy.get('@Button').should('be.disabled')

      cy.get('@Input').clear().should('have.value', '')
      cy.get('@Button').should('not.be.disabled')
      cy.get('@Button').click()

      cy.get('@Input').should('have.value', '')
      cy.get('@Button').should('be.disabled')
    })
  })

  it('should logout and redirect to main page', () => {
    cy.login(USER_EMAIL, USER_PASSWORD)

    cy.get('button')
      .contains('Выйти')
      .should('exist')
      .should('not.be.disabled')
      .as('Button')

    cy.get('@Button').click()
    cy.location('pathname').should('eq', '/')
  })
})
