/// <reference types="cypress" />

import {
  get_account_info_response,
  signed_in_user,
} from "../fixtures/firebase.mock.ts";
import {whoami1} from "../fixtures/user.ts";
import {createUniqueEmail} from "../fixtures/util.ts";

Cypress.Commands.add("getByTestid", <Subject = any>(id: string) => {
  return cy.get<Subject>(`[data-testid='${id}']`);
});

// TinyMCE is loaded through cdn however, some tests require it to be fully loaded
// command source: https://github.com/tracim/tracim/blob/develop/functionnal_tests/cypress/support/commands.js#L125
Cypress.Commands.add("waitForTinyMCELoaded", () => {
  let isTinyMCEActive = false;

  cy.window()
    .its("tinyMCE", {timeout: 1000 * 15})
    .its("activeEditor")
    .then((activeEditor) => {
      if (activeEditor) isTinyMCEActive = true;
    });

  cy.document().then(($doc) => {
    return isTinyMCEActive
      ? true
      : new Cypress.Promise((resolve) => {
          // Cypress will wait for this Promise to resolve
          const onTinyMceLoaded = () => {
            $doc.removeEventListener("tinymceLoaded", onTinyMceLoaded); // cleanup
            resolve(); // resolve and allow Cypress to continue
          };
          $doc.addEventListener("tinymceLoaded", onTinyMceLoaded);
        });
  });
});

Cypress.Commands.add("loginThenRedirect", (to) => {
  cy.intercept("/v1/accounts:lookup?key=*", get_account_info_response());

  cy.intercept(
    "POST",
    "/v1/accounts:signInWithPassword?key=*",
    signed_in_user()
  ).as("signInWithPassword");

  cy.intercept("**/signin", whoami1());

  cy.visit("/login");

  cy.getByTestid("email-field").type(createUniqueEmail());
  cy.getByTestid("password-field").type("dummy_password");
  cy.getByTestid("continue-login").click();

  cy.wait("@signInWithPassword");

  to && cy.visit(to);
});
