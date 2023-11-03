import {
  ERROR_CONFIRM_PASSWORD,
  ERROR_EMAIL,
  ERROR_PASSWORD,
  INCORRECT_CONFIRM_PASSWORD_WARNING,
  INCORRECT_EMAIL_WARNING,
  INCORRECT_PASSWORD_WARNING,
  TAKEN_EMAIL_WARNING,
  USER_CITY,
  USER_EMAIL,
  USER_NAME,
  USER_PASSWORD,
  USER_SURNAME,
} from '../support/constants'

describe('Test registration', () => {
  it('should click signup button and open the signup modal', () => {
    cy.clickButtonAndOpenSignupModal()
  })

  it('should output errors when the user enters invalid e-mail or password', () => {
    cy.clickButtonAndOpenSignupModal()

    cy.get('form[data-cy="signup-modal"]').within(() => {
      cy.root()
        .find('input[data-cy="signup-email"]')
        .type(ERROR_EMAIL)
        .should('have.value', ERROR_EMAIL)
        .blur()
      cy.root().contains(INCORRECT_EMAIL_WARNING).should('exist')

      cy.root()
        .find('input[data-cy="signup-password"]')
        .type(ERROR_PASSWORD)
        .should('have.value', ERROR_PASSWORD)
        .blur()

      cy.root().contains(INCORRECT_PASSWORD_WARNING).should('exist')
    })
  })

  it('should output errors when the user enters different passwords', () => {
    cy.clickButtonAndOpenSignupModal()

    cy.get('form[data-cy="signup-modal"]').within(() => {
      cy.root()
        .find('input[data-cy="signup-email"]')
        .type(USER_EMAIL)
        .should('have.value', USER_EMAIL)
        .blur()

      cy.root()
        .find('input[data-cy="signup-password"]')
        .type(USER_PASSWORD)
        .should('have.value', USER_PASSWORD)
        .blur()

      cy.root()
        .find('input[data-cy="signup-confirmPassword"]')
        .type(ERROR_CONFIRM_PASSWORD)
        .should('have.value', ERROR_CONFIRM_PASSWORD)

      cy.root().submit()
      cy.root().contains(INCORRECT_CONFIRM_PASSWORD_WARNING).should('exist')
    })
  })

  it('should successfully submit the signup form', () => {
    cy.successfulSubmitSignupForm(
      USER_EMAIL,
      USER_PASSWORD,
      USER_NAME,
      USER_SURNAME,
      USER_CITY
    )
  })

  it('should output errors when the user enters taken e-mail', () => {
    cy.clickButtonAndOpenSignupModal()

    cy.get('form[data-cy="signup-modal"]').within(() => {
      cy.root()
        .find('input[data-cy="signup-email"]')
        .clear()
        .type(USER_EMAIL)
        .should('have.value', USER_EMAIL)
      cy.root().contains(INCORRECT_EMAIL_WARNING).should('not.exist')

      cy.root()
        .find('input[data-cy="signup-password"]')
        .clear()
        .type(USER_PASSWORD)
        .should('have.value', USER_PASSWORD)
      cy.root().contains(INCORRECT_PASSWORD_WARNING).should('not.exist')

      cy.root()
        .find('input[data-cy="signup-confirmPassword"]')
        .type(USER_PASSWORD)
        .should('have.value', USER_PASSWORD)

      cy.root().submit()
      cy.root().contains(TAKEN_EMAIL_WARNING).should('exist')
    })
  })
})
