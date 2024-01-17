import {LazyReader, LazyReaderProps, Reader} from "@/features/wisiwig";
import {
  safe1,
  safe1_rendered,
  unsafe1,
  unsafe1_sanitized,
  unsafe1_unsanitized,
} from "@/tests/features/wisiwig/fixtures/mocks.ts";
import {ComponentType} from "react";

describe("Markdown Reader", () => {
  const dom = new DOMParser();

  const expectRawToEqual = (
    Cmp: ComponentType<LazyReaderProps>,
    raw: string,
    expectedHtml: string
  ) => {
    cy.mount(<Cmp>{raw}</Cmp>);
    cy.getByTestid<{get: (id: number) => unknown}>("markdown-viewer").should(
      ($el) => {
        const renderedHtml = ($el.get(0) as HTMLDivElement).innerHTML;

        // We parse the dom string then compares the resulting innerHTML str for more accurate testing
        const rendered = dom
          .parseFromString(renderedHtml, "text/html")
          .children.item(0);
        const expected = dom
          .parseFromString(expectedHtml, "text/html")
          .children.item(0);

        expect(rendered).to.not.null;
        expect(rendered?.innerHTML).to.deep.eq(expected?.innerHTML);
      }
    );
  };

  it("(LAZY) should render html from raw md", () => {
    expectRawToEqual(LazyReader, safe1(), safe1_rendered());
  });

  it("(LAZY) should sanitize md before rendering [XSS-free]", () => {
    expectRawToEqual(LazyReader, unsafe1(), unsafe1_sanitized());
  });

  // <Reader /> can render the html directly... let's test how unsafe it is ... lol
  it("(UNSAFE) should render html without preprocessing [XSS attack]", () => {
    // Content stays as is
    expectRawToEqual(Reader, unsafe1_unsanitized(), unsafe1_unsanitized());

    // when the unsanitized html gets executed
    cy.getByTestid("markdown-viewer").invoke("html", unsafe1_unsanitized());

    // /!\ XSS
    // The document is removed
    cy.get("body").should("not.exist");
  });
});
