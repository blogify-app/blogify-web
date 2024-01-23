describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("renders login form", () => {
    cy.getByTestid("login-form").should("be.visible");
  });

  it("should type email", () => {
    cy.getByTestid("email-field").type("example@gmail.com");
  });

  it("should type password", () => {
    cy.getByTestid("password-field").type("password");
  });
});
