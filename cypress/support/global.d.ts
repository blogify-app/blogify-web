export declare global {
  namespace Cypress {
    interface Chainable {
      getByTestid<Subject>(testid: string): Chainable<Subject>;

      waitForTinyMCELoaded(): Chainable;
      loginThenRedirect(to?: string): Chainable;
      routePathnameEq(to: string): Chainable;
    }
  }
}
