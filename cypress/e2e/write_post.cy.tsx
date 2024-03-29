// TODO: add alias for test fixture
import {non_existent_id, post1} from "../fixtures/post.ts";
import {Post} from "@/services/api/gen";
import {ppicture1} from "../fixtures/pictures.ts";

describe("WritePost", () => {
  it("should display post", () => {
    cy.intercept("GET", `**/posts/${post1().id}`, post1()).as("getPost");

    cy.intercept("PUT", `**/posts/${post1().id}/thumbnail`, ppicture1()).as(
      "UpdateThumbnail"
    );

    cy.intercept("PUT", `**/posts/${post1().id}`, (req) => {
      const post: Post = req.body;
      expect(post.title).to.eq("Edited post title");
      expect(post.description).to.eq("Added description");
      req.reply({
        body: post,
      });
    }).as("SaveEditedPost");

    cy.loginThenRedirect(`/posts/write/${post1().id}`);

    cy.waitForTinyMCELoaded();

    cy.wait("@getPost");
    cy.getByTestid("post-title").should("have.value", post1().title);
    cy.getByTestid("save-post").should("be.visible");

    // edit
    cy.getByTestid("post-title").clear().type("Edited post title");
    cy.getByTestid("post-description").clear().type("Added description");

    cy.getByTestid("image-upload").selectFile(
      "cypress/fixtures/file_mocks/thumbnail.jpg"
    );
    cy.getByTestid("save-post").click();

    cy.wait("@UpdateThumbnail");
    cy.wait("@SaveEditedPost");
  });

  it("should suggest creating new post when trying to write non-existent", () => {
    cy.intercept("GET", `**/posts/${non_existent_id()}`, (req) => {
      // simulate 404 not found
      req.reply({
        statusCode: 404,
      });
    });

    cy.intercept("PUT", `**/posts/*`, (req) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(req.body.title).to.eq("Draft");
      req.reply({
        body: req.body,
        statusCode: 201,
      });
    });

    // TODO: firebase/auth internal error
    cy.loginThenRedirect(`/posts/write/${non_existent_id()}`);

    cy.waitForTinyMCELoaded();

    cy.contains("The post you're trying to edit does not exist");

    // fallbacks correctly to draft post
    cy.getByTestid("post-title").should("have.value", "Draft");
    cy.getByTestid("post-description").should(
      "have.value",
      "Add some description"
    );

    // Create new
    cy.getByTestid("create-new-post").click();
  });
});
