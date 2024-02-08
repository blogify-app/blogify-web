import {post1} from "../fixtures/post";
import {user1, userPicture} from "../fixtures/user";

describe.skip("Profile page", () => {
  it("should display self info", () => {
    cy.intercept("GET", `**/Prod/users/${user1().id}`, user1());
    cy.intercept("GET", `**/users/${user1().id}/posts?**`, []);
    cy.intercept(
      "GET",
      `**/users/${user1()?.id}/pictures?type=PROFILE`,
      userPicture()
    );

    cy.loginThenRedirect();

    cy.contains(`${user1().first_name!} ${user1().last_name}`);
    cy.contains(user1().username!);
    cy.contains(user1().bio!);
    cy.contains(user1().about!);

    cy.getByTestid("customize-channel").should("be.visible");
    cy.getByTestid("create-post").click();

    cy.window()
      .its("location")
      .then((location) => {
        expect(location.pathname).to.match(/\/posts\/write\/.+/);
      });
  });

  it("should display other user info", () => {
    cy.intercept("GET", `**/Prod/users/${user1().id}`, user1());
    cy.intercept("GET", `**/users/${user1().id}/posts?**`, [post1()]);
    cy.intercept(
      "GET",
      `**/users/${user1()?.id}/pictures?type=PROFILE`,
      userPicture()
    );

    cy.visit(`/users/${user1().id}`);

    cy.contains(`${user1().first_name!} ${user1().last_name}`);
    cy.contains(user1().username!);
    cy.contains(user1().bio!);
    cy.contains(user1().about!);

    cy.getByTestid("custom-card").as("PostCard");
    cy.get("@PostCard").contains(user1().last_name!);
    cy.get("@PostCard").contains("Lorem ipsum dolor sit amet consectetur");
    cy.get("@PostCard").contains("Lorem Lorem Description");

    cy.should("not.contain.text", "Manage contents");
    cy.should("not.contain.text", "Customize channel");
  });
});
