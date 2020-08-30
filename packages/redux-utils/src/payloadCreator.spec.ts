import {payloadCreator} from "./payloadCreator";

describe("payloadCreator", () => {
  it("should handle function payload with args", () => {
    const p = payloadCreator("arg1", "arg2");

    const p2 = p((() => {}) as any);

    const p3 = p2(a => a);

    const p4 = p3({
      type: "MOCK_ACTION",
      payload: signal => (a1, a2) => ({
        signal,
        a1,
        a2
      })
    });

    expect(p4.signal).toBeInstanceOf(AbortSignal);

    expect(p4).toMatchObject({
      a1: "arg1",
      a2: "arg2"
    });
  });

  it("should handle payload with args", () => {
    const p = payloadCreator("arg1", "arg2");

    const p2 = p((() => {}) as any);

    const p3 = p2(a => a);

    const p4 = p3({
      type: "MOCK_ACTION",
      payload: () => "mock payload"
    });

    expect(p4).toEqual("mock payload");
  });

  it("should handle promise payload", () => {
    const p = payloadCreator("arg1", "arg2");

    const p2 = p((() => {}) as any);

    const p3 = p2(a => a);

    const p4 = p3({
      type: "MOCK_ACTION",
      payload: Promise.resolve(42)
    });

    expect(p4).resolves.toBe(42);
  });

  it("should handle payload", () => {
    const p = payloadCreator("arg1", "arg2");

    const p2 = p((() => {}) as any);

    const p3 = p2(a => a);

    const p4 = p3({
      type: "MOCK_ACTION",
      payload: 142
    });

    expect(p4).toEqual({
      type: "MOCK_ACTION",
      payload: 142
    });
  });
});
