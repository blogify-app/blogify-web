import {Post} from "@/services/api/gen";
import {non_existent_id, post1} from "../fixtures/post.ts";

describe("WritePost", () => {
  beforeEach(() => {
    cy.waitForTinyMCELoaded();
  });

  it("should display post", () => {
    cy.intercept("GET", `/posts/${post1().id}`, post1()).as("getPost");

    cy.intercept("PUT", `/posts/${post1().id}`, (req) => {
      const post: Post = req.body;
      expect(post.title).to.eq("Edited post title");
      req.reply();
    }).as("saveEditedPost");

    cy.visit(`/posts/write/${post1().id}`);

    cy.wait("@getPost");
    cy.getByTestid("post-title").should("have.value", post1().title);
    cy.getByTestid("save-post").should("be.visible");

    // edit
    cy.getByTestid("post-title").clear().type("Edited post title");
    cy.getByTestid("save-post").click();
    cy.wait("@saveEditedPost");
  });

  it("should suggest creating new post when trying to write non-existent", () => {
    cy.intercept("GET", `/posts/${non_existent_id()}`, (req) => {
      // simulate 404 not found
      req.reply({
        statusCode: 404,
      });
    });

    cy.visit(`/posts/write/${non_existent_id()}`);
    cy.contains("The post you're trying to edit does not exist");

    // fallbacks correctly to draft post
    cy.getByTestid("post-title")
      .should("be.disabled")
      .should("have.value", "Draft");

    // Create new
    cy.getByTestid("create-new-post").click();

    cy.intercept("PUT", `/posts/*`, (req) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(req.body.title).to.eq("New post");
      req.reply({
        body: req.body,
        statusCode: 201,
      });
    });
  });
});
