import {comments} from "../fixtures/comment";
import {non_existent_id, post1} from "../fixtures/post";

describe("Post", () => {
  describe("Display", () => {
    it("should render the post correctly", () => {
      cy.visit(`/posts/${post1().id}`);

      // TODO: more precise test
      cy.intercept("GET", `**/posts/post_1`, post1());
      cy.intercept(
        "GET",
        "**/posts/post_1/comments?page=*&page_size=*",
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

      cy.intercept("GET", `/Prod/posts/${non_existent_id()}`, (req) => {
        req.reply({
          statusCode: 404,
        });
      });

      cy.contains("Could not get the post content.");
    });
  });

  describe.only("Comment", () => {
    it("should render the comment correctly", () => {
      cy.visit(`/posts/${post1().id}`);

      cy.intercept("GET", `/Prod/posts/post_1`, post1());
      cy.intercept(
        "GET",
        "/Prod/posts/post_1/comments?page=*&page_size=*",
        comments()
      );

      cy.getByTestid("comment-author-username").contains("John Doe");
      cy.getByTestid("comment-creation-date").contains("1/2/2024");
      cy.getByTestid("comment-content").should("be.visible");
    });

    it("should notify when unable to get comment", () => {
      cy.visit(`/posts/${post1().id}`);

      // TODO: more precise test
      cy.intercept("GET", `/Prod/posts/post_1`, post1());
      cy.intercept("GET", "/Prod/posts/post_1/comments?page=*&page_size=*", {
        statusCode: 500,
        body: {
          message: "error",
        },
      });

      cy.contains("Could not get the post comment.");
    });

    it("should well render infinite-scroll", () => {
      const commentsData = [
        ...comments(),
        ...comments(),
        ...comments(),
        ...comments(),
      ];
      cy.visit(`/posts/${post1().id}`);

      cy.intercept("GET", `/Prod/posts/post_1`, post1());
      cy.intercept(
        "GET",
        "/Prod/posts/post_1/comments?page=*&page_size=*",
        commentsData
      ).as("getComments");
      cy.contains("No more comment to load.");
      cy.get(".infinite-scroll-component")
        .children()
        .should("have.length", commentsData.length + 1); // + 1 because of 'No more data to load'
    });
  });
});
