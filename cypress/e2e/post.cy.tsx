describe("Post", () => {
  beforeEach(() => {
    cy.visit("/posts/1");
    cy.scrollTo("top");
  });

  it("renders the title", () => {
    cy.getByTestid("post-title").should("be.visible");
  });

  it("renders the post details", () => {
    cy.getByTestid("post-details").should("be.visible");

    cy.scrollTo("top");
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
    cy.getByTestid("post-tags").should("be.visible").contains("Tags");
    cy.contains("Lorem");
    cy.contains("Ipsum");
    cy.contains("Hello");
  });

  it("renders the user infos", () => {
    cy.getByTestid("user-details")
      .should("be.visible")
      .contains("See more about this author");
    cy.getByTestid("user-profile-picture").should("be.visible");
  });
});
