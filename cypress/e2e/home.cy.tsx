describe("Home", () => {
  it("should redirect to /posts when landing on /", () => {
    cy.visit("/");

    cy.window()
      .its("location")
      .should((location) => {
        expect(location.pathname).to.eq("/posts");
      });
  });
});
