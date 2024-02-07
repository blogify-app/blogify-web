import {comments} from "../fixtures/comment";
import {post1, post1Liked} from "../fixtures/post";

describe("ReactPost", () => {
  it("should like a post", () => {
    cy.loginThenRedirect(`/posts/${post1().id}`);

    cy.intercept("GET", `**/posts/${post1().id}`, post1());
    cy.intercept(
      "GET",
      "**/posts/post_1/comments?page=1&page_size=500",
      comments()
    );

    cy.getByTestid("like").click();

    cy.intercept("POST", `**/posts/${post1().id}/reaction?type=LIKE`, (req) => {
      req.reply({
        body: post1Liked(),
        statusCode: 200,
        headers: {
          "content-type": "applicaion/json",
        },
      });

      cy.visit(`/posts/${post1().id}`);

      cy.intercept("GET", `**/posts/${post1().id}`, post1());
    });

    it("should dislike a post", () => {
      cy.loginThenRedirect(`/posts/${post1().id}`);

      cy.intercept("GET", `**/posts/${post1().id}`, post1());
      cy.intercept(
        "GET",
        "**/posts/post_1/comments?page=1&page_size=500",
        comments()
      );

      cy.getByTestid("like").click();

      cy.intercept(
        "POST",
        `**/posts/${post1().id}/reaction?type=DISLIKE`,
        (req) => {
          req.reply({
            body: post1Liked(),
            statusCode: 200,
            headers: {
              "content-type": "applicaion/json",
            },
          });
        }
      );

      it("should post reacted", () => {
        cy.visit(`/posts/${post1().id}`);

        cy.intercept("GET", `**/posts/${post1().id}`, post1());
        cy.intercept(
          "GET",
          "**/posts/post_1/comments?page=1&page_size=500",
          comments()
        );

        cy.getByTestid("like-reaction").contains(1001);
        cy.getByTestid("dislike-reaction").contains(200);

        cy.getByTestid("like-svg").should("be.visible");
        cy.getByTestid("dislike-svg").should("be.visible");
      });
    });
  });
});
