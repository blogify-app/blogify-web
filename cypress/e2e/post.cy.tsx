import {comments} from "../fixtures/comment";
import {post1} from "../fixtures/post";

describe("Post", () => {
  // TODO: more precise test
  beforeEach(() => {
    cy.visit(`/posts/${post1().id}`);
    cy.intercept("GET", `/posts/${post1().id}`, post1());
    cy.intercept("GET", `/users/${post1().author_id}`, post1());
    cy.intercept(
      "GET",
      "/posts/post_1/comments?page=0&page_size=500",
      comments()
    );
  });

  it("renders the title", () => {
    cy.getByTestid("post-title").contains(
      "Lorem ipsum dolor sit amet consectetur"
    );
  });

  it("renders the post details", () => {
    cy.getByTestid("post-details").should("be.visible");
    cy.getByTestid("post-details").contains("by");
    cy.contains("min read");
  });

  it("renders the banner", () => {
    cy.getByTestid("post-banner").should("be.visible");
  });

  it("renders the content", () => {
    cy.getByTestid("post-content").should("be.visible");
  });

  it("renders the tags", () => {
    cy.getByTestid("post-tags").as("tags");
    cy.get("@tags").should("be.visible");
    cy.get("@tags").contains("Ipsum");
    cy.get("@tags").contains("Lorem");
    cy.get("@tags").contains("Hello");
  });

  it("renders the user infos", () => {
    cy.getByTestid("user-details").contains("See more about this author");
    cy.getByTestid("user-profile-picture").should("be.visible");
  });
});

describe("Comment", () => {
  beforeEach(() => {
    cy.visit(`/posts/${post1().id}`);
    cy.intercept("GET", `/posts/${post1().id}`, post1());
    cy.intercept("GET", `/users/${post1().author_id}`, post1());
    cy.intercept(
      "GET",
      "/posts/post_1/comments?page=0&page_size=500",
      comments()
    );
  });

  it("should render the comment correctly", () => {
    cy.getByTestid("comment-author-username").contains("John Doe");
    cy.getByTestid("comment-creation-date").contains("30/01/2024");
    cy.getByTestid("comment-content").should("be.visible");
  });
});
