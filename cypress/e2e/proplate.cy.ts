describe("Proplate generated e2e testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should bootstrap the project correctly", () => {
    // 'blogify-web' being a dynamic var
    cy.getByTestid("typo0").contains("blogify-web works");
  });
});
