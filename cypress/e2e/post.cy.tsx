import {comments, createComment1} from "../fixtures/comment";
import {non_existent_id, post1} from "../fixtures/post";

describe("Post", () => {
  describe("Category", () => {
    it("should display the category", () => {
      cy.visit(`/posts/${post1().id}`);

      cy.intercept("GET", `**/posts/${post1().id}`, post1());

      cy.getByTestid("category-1").should("be.visible");
      cy.getByTestid("category-2").should("be.visible");
      cy.getByTestid("category-3").should("be.visible");
    });
  });
  describe("Reaction", () => {
    it("should render the reaction correctly", () => {
      cy.visit(`/posts/${post1().id}`);

      cy.intercept("GET", `**/posts/${post1().id}`, post1());

      cy.getByTestid("like-reaction").contains(1000);
      cy.getByTestid("dislike-reaction").contains(200);

      cy.getByTestid("like-svg").should("be.visible");
      cy.getByTestid("dislike-svg").should("be.visible");

      cy.getByTestid("like").should("be.visible");
      cy.getByTestid("dislike").should("be.visible");
    });
  });

  describe("Display", () => {
    it("should render the post correctly", () => {
      cy.visit(`/posts/${post1().id}`);

      // TODO: more precise test
      cy.intercept("GET", `**/posts/${post1().id}`, post1());
      cy.intercept(
        "GET",
        "**/posts/post_1/comments?page=1&page_size=500",
        comments()
      );

      cy.getByTestid("post-title").contains(
        "Lorem ipsum dolor sit amet consectetur"
      );
      cy.getByTestid("post-details").should("be.visible");
      cy.getByTestid("post-details").contains("by");
      cy.contains("min read");

      cy.getByTestid("post-banner").should("be.visible");
      cy.getByTestid("post-content").should("be.visible");

      cy.getByTestid("post-tags").as("tags");
      cy.get("@tags").should("be.visible");
      cy.get("@tags").contains("Ipsum");
      cy.get("@tags").contains("Lorem");
      cy.get("@tags").contains("Hello");

      cy.getByTestid("user-details").contains("See more about this author");
      cy.getByTestid("user-profile-picture").should("be.visible");
    });

    it("should notify when unable to get post", () => {
      cy.visit(`/posts/${non_existent_id()}`);

      cy.intercept("GET", `**/posts/${non_existent_id()}`, (req) => {
        req.reply({
          statusCode: 404,
        });
      });

      cy.contains("Could not get the post content.");
    });
  });

  describe("Comment", () => {
    it("should render the comment correctly", () => {
      cy.visit(`/posts/${post1().id}`);

      cy.intercept("GET", `**/posts/${post1().id}`, post1());
      cy.intercept(
        "GET",
        "**/posts/post_1/comments?page=1&page_size=500",
        comments()
      );

      cy.getByTestid("comment-author-username").contains("John Doe");
      cy.getByTestid("comment-creation-date").contains("1/2/2024");
      cy.getByTestid("comment-content").should("be.visible");
    });

    it("should notify when unable to get comment or user", () => {
      cy.visit(`/posts/${post1().id}`);

      // TODO: more precise test
      cy.intercept("GET", `**/posts/${post1().id}`, post1());
      cy.intercept("GET", "**/posts/post_1/comments?page=1&page_size=500", {
        statusCode: 500,
        body: {
          message: "error",
        },
      });

      cy.contains("Could not get the post comment.");
    });

    it("can add a comment", () => {
      cy.loginThenRedirect(`/posts/${post1().id}`);

      cy.intercept("GET", "**/posts/post_1", post1());
      cy.intercept(
        "GET",
        "**/posts/post_1/comments?page=1&page_size=500",
        comments()
      );
      cy.intercept("PUT", "**/posts/post_1/comments/**", createComment1());

      cy.intercept("GET", "**/posts/post_1/comments?page=1&page_size=500", [
        ...comments(),
        createComment1(),
      ]);

      cy.getByTestid("comment-input").type("Dummy fuckn comment !!!!");
      cy.getByTestid("add-comment-button").click();

      cy.contains(createComment1()?.content!);
    });

    it("cannot add a comment when not authenticated", () => {
      cy.visit(`/posts/${post1().id}`);

      cy.intercept("GET", "**/posts/post_1", post1());
      cy.intercept(
        "GET",
        "**/posts/post_1/comments?page=1&page_size=500",
        comments()
      );
      cy.contains(
        "You are not authenticated. If you want to write comments log in or sign up."
      );
    });
  });
});
