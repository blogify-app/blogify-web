describe("PostCreation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should go to post creation page", () => {
    cy.contains("New Home").click();

    cy.contains("Nouveau post");
  });
});
