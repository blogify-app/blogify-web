/// <reference types="cypress" />

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
