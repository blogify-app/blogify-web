import {calculateReadDuration} from "@/features/post/utils";

describe("post.utils", () => {
  describe("Calculate read duration", () => {
    const on_falsy = () => ({
      minutes: 0,
      seconds: 0,
    });

    it("should return 0 when param is falsy", () => {
      expect(calculateReadDuration("")).to.deep.equal(on_falsy());
      expect(calculateReadDuration(undefined)).to.deep.equal(on_falsy());
    });

    it("should return the read duration when with valid text", () => {
      expect(calculateReadDuration("Hello there !")).to.deep.equal({
        minutes: 0,
        seconds: 1,
      });
    });
  });
});
