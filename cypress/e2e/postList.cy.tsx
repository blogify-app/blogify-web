import {createPosts} from "../fixtures/postList";

describe("PostList", () => {
    it("should redirect to /posts when landing on /", () => {
        cy.visit("/posts");

        cy.intercept("GET", `**/Prod/posts`, createPosts(10));



        cy.window()
            .its("location")
            .should((location) => {
                expect(location.pathname).to.eq("/posts");
            });
    });
});
