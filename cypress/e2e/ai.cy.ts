import {post1} from "../fixtures/post.ts";
import {user1} from "../fixtures/user.ts";

describe("AI analysis", () => {
  it("should emit view post and get recommended posts", () => {
    cy.intercept(`**/Prod/posts/${post1().id}`, post1());
    cy.intercept(`**/Prod/users/${user1().id}`, user1());
    cy.intercept(
      `**/Prod/users/${user1().id}/view/posts/${post1().id}`,
      (req) => {
        req.reply({
          statusCode: 200,
        });
      }
    ).as("ViewPost");

    cy.intercept("**/suggestions/posts?page=*&page_size=*", [post1()]).as(
      "GetRecommendedPosts"
    );

    cy.loginThenRedirect();

    cy.visit("/");
    cy.wait("@GetRecommendedPosts");

    cy.getByTestid(post1().id!).click({force: true});
    cy.wait("@ViewPost");
  });
});
