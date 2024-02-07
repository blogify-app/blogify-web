import {
  createPosts,
  post1,
  postWithoutThumbnail,
  postWithoutValues,
} from "../fixtures/post.ts";

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
    cy.getByTestid("default-thumbnail");
  });

  it("should not break the UI when some values are null", () => {
    cy.visit("/posts");

    cy.intercept("GET", `**/posts?page=*&page_size=*`, postWithoutValues());
    cy.contains("Recent blog posts");
    cy.contains("All blog posts");
  });

  it("should display all tags of a post", () => {
    cy.visit("/posts");

    cy.intercept("GET", `**/posts?page=*&page_size=*`, [post1()]);
    cy.contains("Mathematics");
    cy.contains("Podcasts");
    cy.contains("Tools");
  });

  it("should show error message when posts are not displayed due to the backend", () => {
    cy.visit("/posts");

    cy.intercept("GET", `**/posts?page=*&page_size=*`, {
      statusCode: 500,
      body: {
        message: "error",
      },
    });

    cy.contains("Could not get posts list.");
  });

  it("test pagination", () => {
    cy.visit("/posts");

    cy.intercept("GET", `**/posts?page=*&page_size=*`, createPosts(10));

    cy.getByTestid("next-page").click();
    cy.contains("2");

    cy.getByTestid("next-page").click();
    cy.contains("3");

    cy.getByTestid("prev-page").click();
    cy.contains("2");
  });
});
