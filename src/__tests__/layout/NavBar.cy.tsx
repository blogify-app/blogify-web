import {NavBar} from "@/layout";
import {BrowserRouter} from "react-router-dom";

describe("Navbar", () => {
  it("should should be be visible", () => {
    cy.mount(
      // react-router-dom components require Navigation Context
      // BrowserRouter does provide one so render "navbar" under BrowserRouter
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    cy.getByTestid("Navbar").should("be.visible");

    cy.get("a").contains("BLOGIFY");

    cy.contains("Home");
    cy.contains("Profile");
    cy.contains("Posts");
  });
});
