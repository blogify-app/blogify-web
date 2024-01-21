describe("Home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should contain connection page", () => {
    cy.contains("Login");
    cy.contains("Logout");

    cy.get("em").contains("None");
  });
});
