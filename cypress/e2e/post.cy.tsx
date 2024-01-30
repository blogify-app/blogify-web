import {post1} from "../fixtures/post";

describe("Post", () => {
  // TODO: more precise test
  beforeEach(() => {
    cy.visit("/posts/1");
    cy.intercept("GET", "/posts/1", post1());
    cy.intercept("GET", `/users/${post1().author_id}`, post1());
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

  it("renders like reactions", () => {
    cy.getByTestid("like-reaction").contains(1000);
    cy.getByTestid("like-reaction").should("be.visible");
  });

  it("renders dislike reaction", () => {
    cy.getByTestid("dislike-reaction").contains(200);
    cy.getByTestid("dislike-reaction").should("be.visible");
  });
});
