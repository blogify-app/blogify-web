export declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      getByTestid(testid: string): Chainable<Subject>;
    }
  }
}
