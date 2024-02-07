import {post1} from "../fixtures/post";
import {user1, userPicture} from "../fixtures/user";

describe("Profile page", () => {
  describe("Display for unauthenticated user", () => {
    it("Display user information correctly", () => {
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
    });

    it("User without posts", () => {
      cy.intercept(
        "GET",
        `**/users/${user1()?.id}/pictures?type=PROFILE`,
        userPicture()
      );

      cy.visit(`/users/${user1().id}`);

      cy.intercept("GET", `**/users/${user1()?.id}`, user1());

      cy.intercept(
        "GET",
        `**/users/${user1()?.id}/posts?page=1&page_size=50`,
        []
      );

      cy.getByTestid("missing-post-message").contains(
        "Upload or save content wherever you are, and all your public ideas will appear here."
      );

      cy.getByTestid("create-post").click();

      cy.location("pathname").should("eq", "/login");
    });
  });
});
