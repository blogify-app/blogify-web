import {non_existent_id, post1} from "../fixtures/post.ts";

describe("WritePost", () => {
  it("should display and write existing post", () => {
    cy.visit(`/posts/write/${post1().id}`);
    cy.intercept("GET", `/posts/${post1().id}`, post1());

    cy.contains(`Writing: ${post1().title}`);
  });

  it("should create when not existing", () => {
    cy.visit(`/posts/write/${non_existent_id()}`);

    cy.intercept("GET", `/posts/${non_existent_id()}`, (req) => {
      // simulate 404 not found
      req.reply({
        statusCode: 404,
      });
    });

    cy.intercept("PUT", `/posts/*`, (req) => {
      // we are PUT /posts/.. the "none-existent" post
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(req.body.id).to.contains("non-existent");
      req.reply({
        body: req.body,
        statusCode: 201,
      });
    });
  });
});
