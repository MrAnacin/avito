declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<void>
    clickButtonAndOpenLoginModal(): Chainable<void>
    clickButtonAndOpenSignupModal(): Chainable<void>
    successfulSubmitSignupForm(
      email: string,
      password: string,
      name: string,
      surname: string,
      city: string
    ): Chainable<void>
    changeUserSettings(parameter: 'name' | 'surname' | 'city'): Chainable<void>
    createProduct(): Chainable<void>
  }
}
