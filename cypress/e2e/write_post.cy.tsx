import {non_existent_id, post1} from "../fixtures/post.ts";

describe("WritePost", () => {
  it("should display post", () => {
    cy.visit(`/posts/write/${post1().id}`);
    cy.intercept("GET", `/posts/${post1().id}`, post1());
    cy.getByTestid("post-title").should("have.value", post1().title);
  });

  it("should suggest creating new post when trying to write non-existent", () => {
    cy.intercept("GET", `/posts/${non_existent_id()}`, (req) => {
      // simulate 404 not found
      req.reply({
        statusCode: 404,
      });
    });

    cy.visit(`/posts/write/${non_existent_id()}`);
    cy.contains("This post does not exist");

    // fallbacks correctly to draft post
    cy.getByTestid("post-title").should("have.value", "Draft");

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
