import {APIError, withAPIError} from "./APIError";

describe("APIError", () => {
  it("should create correct error object", () => {
    const error = new APIError("API Error", 10, 404);

    expect(error.name).toBe("APIError")
    expect(error.message).toBe("API Error")
    expect(error.code).toBe(10)
    expect(error.status).toBe(404)
  })
})

describe("withAPIError", () => {
  it("should wrap with APIError with invalid status", async () => {
    const error = await withAPIError(() => Promise.resolve(42));

    expect(error).toBe(42)
  })

  it("should wrap with APIError with valid status", async () => {
    await expect(withAPIError(() => Promise.reject(new Error("OOPS")))).rejects.toThrow("Request failed with status code undefined")

    await expect(withAPIError(() => Promise.reject({response: {status: 500}}))).rejects.toThrow("Request failed with status code 500")
  })
})
