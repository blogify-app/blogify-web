import {comments} from "../fixtures/comment";
import {post1} from "../fixtures/post";

describe("Post", () => {
  describe("Display", () => {
    it("should render the post correctly", () => {
      cy.visit(`/posts/${post1().id}`);

      // TODO: more precise test
      cy.intercept("GET", `**/posts/${post1().id}`, post1());
      cy.intercept("GET", `**/users/${post1().author_id}`, post1());
      cy.intercept(
        "GET",
        "**/posts/post_1/comments?page=0&page_size=500",
        comments()
      );

      cy.getByTestid("post-title").contains(
        "Lorem ipsum dolor sit amet consectetur"
      );
      cy.getByTestid("post-details").should("be.visible");
      cy.getByTestid("post-details").contains("by");
      cy.contains("min read");

      cy.getByTestid("post-banner").should("be.visible");
      cy.getByTestid("post-content").should("be.visible");

      cy.getByTestid("post-tags").as("tags");
      cy.get("@tags").should("be.visible");
      cy.get("@tags").contains("Ipsum");
      cy.get("@tags").contains("Lorem");
      cy.get("@tags").contains("Hello");

      cy.getByTestid("user-details").contains("See more about this author");
      cy.getByTestid("user-profile-picture").should("be.visible");
    });
  });

  describe("Comment", () => {
    it("should render the comment correctly", () => {
      cy.visit(`/posts/${post1().id}`);

      cy.intercept("GET", `**/posts/${post1().id}`, post1());
      cy.intercept("GET", `**/users/${post1().author_id}`, post1());
      cy.intercept(
        "GET",
        "**/posts/post_1/comments?page=0&page_size=500",
        comments()
      );

      cy.getByTestid("comment-author-username").contains("John Doe");
      cy.getByTestid("comment-creation-date").contains("11/3/2024");
      cy.getByTestid("comment-content").should("be.visible");
    });
  });
});
