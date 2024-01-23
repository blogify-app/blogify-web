describe("Login", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("renders signup form", () => {
    cy.getByTestid("signup-form").should("be.visible");
  });

  it("should type email", () => {
    cy.get("floating_email").type("example@gmail.com");
  });

  it("should type password", () => {
    cy.get("floating_password").type("password");
  });

  it("should type firstname", () => {
    cy.get("floating_first_name").type("firstname");
  });
  it("should type lastname", () => {
    cy.get("floating_last_name").type("lastname");
  });
});
