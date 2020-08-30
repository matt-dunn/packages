import {isErrorMeta} from "./errorMeta";

describe("isErrorMeta", () => {
  it("should return true if error meta like", () => {
    expect(isErrorMeta({
      component: {}
    })).toEqual(true);
  });

  it("should return false if not error like", () => {
    expect(isErrorMeta({
    })).toEqual(false);

    expect(isErrorMeta({
      a: {}
    })).toEqual(false);
  });
});
