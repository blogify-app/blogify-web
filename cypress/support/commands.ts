/// <reference types="cypress" />

Cypress.Commands.add("getByTestid", (id) => {
  return cy.get(`[data-testid='${id}']`);
});
