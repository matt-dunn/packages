import {APPError} from "./APPError";

describe("APPError", () => {
  it("should create correct error object", () => {
    const error = new APPError("APP Error", 10);

    expect(error.name).toBe("APPError")
    expect(error.message).toBe("APP Error")
    expect(error.code).toBe(10)
  })
})
