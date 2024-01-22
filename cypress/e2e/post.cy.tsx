describe("Post", () => {
  // TODO: more precise test
  beforeEach(() => {
    cy.visit("/posts/1");
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

  it("renders the content's menu", () => {
    cy.getByTestid("post-content-menu").should("be.visible").contains("Menu");
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
