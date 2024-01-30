/// <reference types="cypress" />

import {
  get_account_info_response,
  signed_in_user,
} from "../fixtures/firebase.mock.ts";
import {user1} from "../fixtures/user.ts";

Cypress.Commands.add("getByTestid", <Subject = any>(id: string) => {
  return cy.get<Subject>(`[data-testid='${id}']`);
});

// TinyMCE is loaded through cdn however, some tests require it to be fully loaded
// command source: https://github.com/tracim/tracim/blob/develop/functionnal_tests/cypress/support/commands.js#L125
Cypress.Commands.add("waitForTinyMCELoaded", () => {
  let isTinyMCEActive = false;

  cy.window()
    .its("tinyMCE")
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
  cy.intercept(
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=*",
    get_account_info_response()
  );

  cy.intercept(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=*",
    signed_in_user()
  );

  cy.visit("/login");

  cy.getByTestid("email-field").type(user1().email!);
  cy.getByTestid("password-field").type("dummy_password");
  cy.getByTestid("continue-login").click();

  to && cy.visit(to);
});
