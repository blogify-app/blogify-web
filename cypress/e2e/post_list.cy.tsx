import {createPosts} from "../fixtures/post.ts";

describe("PostList", () => {
  it("should redirect to /posts when landing on /", () => {
    cy.visit("/posts");

    // "*" to match any value of 'page' and 'page_size'
    cy.intercept("GET", `**/posts?page=*&page_size=*`, createPosts(1));
  });
});
