import {post1} from "../fixtures/post";
import {user1, userPicture} from "../fixtures/user";

describe("Profile page", () => {
  it("should display self info", () => {
    cy.loginThenRedirect();

    // self
    cy.intercept("GET", `**/users/${user1().id}`, user1());
    cy.intercept("GET", `**/users/${user1().id}/posts?page=1&page_size=50`, [
      post1(),
    ]);
    cy.intercept(
      "GET",
      `**/users/${user1()?.id}/pictures?type=PROFILE`,
      userPicture()
    );

    cy.getByTestid("user-fullname").contains("Blogify worker");
    cy.getByTestid("user-name").contains("John Doe");
    cy.getByTestid("user-bio").contains("Lorem Bio");
    cy.getByTestid("user-about").contains(
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias totam recusandae a reiciendis quas ducimus at tempora neque quasi eveniet, magni deleniti sapiente voluptas tenetur labore ad quod vero dignissimos?"
    );

    cy.getByTestid("customize-channel").should("be.visible");
    cy.getByTestid("create-post").click();

    cy.window()
      .its("location")
      .then((location) => {
        expect(location.pathname).to.match(/\/posts\/write\/.+/);
      });
  });

  it("should display other user info", () => {
    cy.visit(`/users/${user1().id}`);

    cy.intercept("GET", `**/users/${user1()?.id}`, user1());
    cy.intercept("GET", `**/users/${user1()?.id}/posts?page=1&page_size=50`, [
      post1(),
    ]);
    cy.intercept(
      "GET",
      `**/users/${user1()?.id}/pictures?type=PROFILE`,
      userPicture()
    );

    cy.getByTestid("user-fullname").contains("Blogify worker");
    cy.getByTestid("user-name").contains("John Doe");
    cy.getByTestid("user-bio").contains("Lorem Bio");
    cy.getByTestid("user-about").contains(
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias totam recusandae a reiciendis quas ducimus at tempora neque quasi eveniet, magni deleniti sapiente voluptas tenetur labore ad quod vero dignissimos?"
    );

    cy.getByTestid("post-title").contains(
      "Lorem ipsum dolor sit amet consectetur"
    );
    cy.getByTestid("post-description").contains("Lorem Lorem Description");
    cy.getByTestid("author-info").contains("Blogify worker");

    cy.should("not.contain.text", "Manage contents");
    cy.should("not.contain.text", "Customize channel");
  });
});
