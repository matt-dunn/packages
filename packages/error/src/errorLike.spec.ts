import {errorLike, isErrorLike} from "./errorLike";

describe("errorLike", () => {
  it("should return error object", () => {
    expect(errorLike(new Error("Error"))).toEqual({
      message: "Error"
    });
  });
});

describe("isErrorLike", () => {
  it("should return true if error like", () => {
    expect(isErrorLike(new Error("Error"))).toEqual(true);

    expect(isErrorLike({
      message: "Error",
      name: "error"
    })).toEqual(true);

    expect(isErrorLike({
      message: "Error",
      name: "error",
      other: "some other property"
    })).toEqual(true);
  });

  it("should return false if not error like", () => {
    expect(isErrorLike({
      message: "Error",
    })).toEqual(false);

    expect(isErrorLike({
      message: "Error",
      other: "some other property"
    })).toEqual(false);

    expect(isErrorLike({
      other: "some other property"
    })).toEqual(false);
  });
});
