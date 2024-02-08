import {
  get_account_info_response,
  signup_new_user_response,
  user_to_signup,
} from "../fixtures/firebase.mock.ts";
import {whoami1} from "../fixtures/user.ts";

describe.only("Authentication", () => {
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

  it.only("shoud show navigation header when authenticated", () => {
    cy.loginThenRedirect("/posts");

    cy.get("a").contains("BLOGIFY");

    cy.contains("Home");
    cy.contains("Profile");
    cy.contains("Posts");
  });

  describe("Validation", () => {
    it("should validate login form", () => {
      cy.visit("/login");
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

  describe("Login", () => {
    it("should notify when login failed", () => {
      cy.visit("/login");
      cy.intercept(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=*",
        {
          statusCode: 500,
          body: {
            message: "error",
          },
        }
      );
      cy.getByTestid("email-field").type("correct@gmail.com");

      cy.getByTestid("password-field").type("long_password");

      // TODO: test that it lands on profile page
      cy.getByTestid("continue-login").click();
      cy.contains("Log in failed");
    });
  });

  describe("Signup", () => {
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

    it("should notify when the sign up failed", () => {
      cy.intercept(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=*",
        {
          statusCode: 500,
          body: {
            message: "error",
          },
        }
      );

      cy.intercept("/signin", {
        statusCode: 500,
        body: {
          message: "error",
        },
      });

      cy.intercept(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=*",
        {
          statusCode: 500,
          body: {
            message: "error",
          },
        }
      );

      // TODO: test for social media oauth
      cy.visit("/signup");

      const {email, password} = user_to_signup();
      cy.getByTestid("email-field").type(email);
      cy.getByTestid("password-field").type(password);
      cy.getByTestid("continue-signup").click();

      cy.contains("Sign up failed");
    });
  });
});
