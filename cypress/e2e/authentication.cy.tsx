import {
  get_account_info_response,
  signup_new_user_response,
  user_to_signup,
} from "../fixtures/firebase.mock.ts";
import {whoami1} from "../fixtures/user.ts";

describe("Authentication", () => {
  it("should redirect when not logged in on protected route", () => {
    cy.visit("/authenticated");

    // wait redirection
    cy.wait(100);

    cy.window()
      .its("location")
      .then((location) => {
        expect(location.pathname).to.eq("/login");
      });
  });

  it("should either show sign in or sign up btn on header", () => {
    cy.visit("/login");

    cy.getByTestid("auth-button").as("buttons");

    // displays signup btn in /login page
    cy.get("@buttons").contains("Sign up").click();
    // displays sign in btn in /signup page
    cy.get("@buttons").contains("Sign in");
  });

  describe("Validation", () => {
    it("should validate login form", () => {
      cy.visit("/protected");
      // try to continue login without filling anyfields
      cy.getByTestid("continue-login").click();

      // email
      cy.contains("Required");

      cy.getByTestid("email-field").type("bad_mail");
      cy.contains("Invalid email");
      cy.getByTestid("email-field").type("correct@gmail.com");

      cy.getByTestid("password-field").type("short");
      cy.contains("Password must contain at least 8 character(s)");
      cy.getByTestid("password-field").type("long_password");

      // TODO: test that it lands on profile page
      cy.getByTestid("continue-login").click();
    });
  });

  describe.only("Signup", () => {
    it("should sign up user", () => {
      cy.intercept(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=*",
        signup_new_user_response()
      );

      cy.intercept("/signin", whoami1());

      cy.intercept(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=*",
        get_account_info_response()
      );

      // TODO: test for social media oauth
      cy.visit("/signup");

      // step(1)
      const {email, password} = user_to_signup();
      cy.getByTestid("email-field").type(email);
      cy.getByTestid("password-field").type(password);
      cy.getByTestid("continue-signup").click();

      // step(2)
    });
  });
});
