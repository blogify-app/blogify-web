export declare global {
  namespace Cypress {
    interface Chainable {
      getByTestid<S>(testid: string): Chainable<S>;
    }
  }
}
