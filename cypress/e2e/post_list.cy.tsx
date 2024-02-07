import {createPosts, post1, postWithoutThumbnail, postWithoutValues} from "../fixtures/post.ts";

describe("PostList", () => {
  it("should render all posts", () => {
    cy.visit("/posts");

    // "*" to match any value of 'page' and 'page_size'
    cy.intercept("GET", `**/posts?page=*&page_size=*`, createPosts(10));
    cy.intercept("GET", `**/posts/${post1().id}`, post1());
  });

  it("should show one post when a specific post is clicked on", () => {
    cy.visit("/posts");

    // "*" to match any value of 'page' and 'page_size'
    cy.intercept("GET", `**/posts?page=*&page_size=*`, createPosts(10));
    cy.intercept("GET", `**/posts/${post1().id}`, post1());

    cy.getByTestid("post_1").click();
    cy.window()
        .its("location")
        .should((location) => {
          expect(location.pathname).to.eq("/posts/post_1");
        });
  });

  it("should render the default thumbnail when no picture is provided", () => {
    cy.visit("/posts");

    cy.intercept("GET", `**/posts?page=*&page_size=*`, postWithoutThumbnail());
    cy.getByTestid("default-thumbnail")
  });

  it("should not break the UI when some values are null", () => {
    cy.visit("/posts");

    cy.intercept("GET", `**/posts?page=*&page_size=*`, postWithoutValues());
    cy.contains("Recent blog posts");
    cy.contains("All blog posts");
  });

});
