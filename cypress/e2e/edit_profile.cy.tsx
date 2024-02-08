import {user1, user1_modified} from "../fixtures/user";
import "cypress-file-upload";
import {UserProvider} from "@/services/api";

describe("Edit profile", () => {
  it("should display the layout and component of Profile Edit Page", () => {
    cy.visit(`/users/edit/${user1().id}`);

    cy.intercept("GET", `**/users/${user1().id}`, (req) => {
      req.reply({
        body: user1(),
        statusCode: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    });

    cy.getByTestid("profile_edit_layout").should("exist");

    cy.getByTestid("first_name_item").should("exist");
    cy.getByTestid("last_name_input").should("exist");
    cy.getByTestid("username_input").should("exist");
    cy.getByTestid("sex_input").should("exist");
    cy.getByTestid("birth_date_input").should("exist");
    cy.getByTestid("date_button").should("exist");
  });

  it("should show image placeholder", () => {
    cy.visit(`/users/edit/${user1().id}`);

    cy.get('img[alt="@shadcn"]').should("be.visible");

    cy.getByTestid("avatar_image").should("exist");

    cy.get('img[alt="@shadcn"]')
      .should("have.attr", "src")
      .then((src) => {
        expect(src).to.not.equal("data:,");
      });
  });

  it("update user infos should success", () => {
    cy.visit(`/users/edit/${user1().id}`);

    cy.getByTestid("first_name_input")
      .type("Blogify modified", {delay: 50})
      .should("have.value", "Blogify modified");

    cy.get("[data-testid='submit_button']").click();

    cy.intercept("PUT", `**/users/${user1().id}`, (req) => {
      req.reply({
        body: user1_modified(),
        statusCode: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    });

    cy.stub(UserProvider, "crupdateById").resolves();
  });
});
