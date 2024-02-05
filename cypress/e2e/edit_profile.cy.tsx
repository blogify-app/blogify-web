import {user1} from "../fixtures/user";

describe("Edit profile", () => {
  it("should display the layout and component of Profile Edit Page", () => {
    cy.visit(`/users/edit/${user1().id}`);
    cy.wait(1000);
    cy.getByTestid("first_name_input").should("exist");
    cy.getByTestid("last_name_input").should("exist");
    cy.getByTestid("username_input").should("exist");
    cy.getByTestid("sex_input").should("exist");
    cy.getByTestid("birth_date_input").should("exist");
    cy.getByTestid("date_button").should("exist");
  });

  it("should render the image correctly after upload", () => {
    cy.visit(`/users/edit/${user1().id}`);

    cy.get('img[alt="@shadcn"]').should("be.visible");

    cy.get('img[alt="@shadcn"]')
      .should("have.attr", "src")
      .then((src) => {
        expect(src).to.not.equal("data:,");
      });
  });
});
