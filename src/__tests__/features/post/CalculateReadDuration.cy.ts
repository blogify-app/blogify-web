import {calculateReadDuration} from "@/features/post/utils";

describe("Calculate read duration", () => {
  it("should return 0 when blank string", () => {
    expect(calculateReadDuration("")).to.deep.equal({minutes: 0, seconds: 0});
  });
  it("should return 0 when the param is undefined", () => {
    expect(calculateReadDuration(undefined)).to.deep.equal({
      minutes: 0,
      seconds: 0,
    });
  });
  it("should return 0 when the param is a text", () => {
    expect(calculateReadDuration("Hello there !")).to.deep.equal({
      minutes: 0,
      seconds: 1,
    });
  });
});
