import {symbolStatus} from "./status";

import { deserialize, getPayload, serialize } from "./utils";

describe("serialize", () => {
  it("should return a serialized string", () => {
    const o = serialize({
      a: 42,
      b: [1, "2", false],
      c: false,
      d: true,
      e: "str",
      f: {
        a: 1,
        b: false,
        c: true
      }
    });

    expect(JSON.parse(o)).toEqual(JSON.parse("{\"a\":42,\"b\":[1,\"2\",false],\"c\":false,\"d\":true,\"e\":\"str\",\"f\":{\"a\":1,\"b\":false,\"c\":true}}"));
  });

  it("should return a serialized string with status symbol", () => {
    const o = serialize({
      a: 42,
      b: [1, "2", false],
      c: false,
      d: true,
      e: "str",
      f: {
        a: 1,
        b: false,
        c: true
      },
      [symbolStatus]: {
        processing: true
      },
      g: [
        {
          a: 1,
          b: false,
          c: true,
          d: "str",
          [symbolStatus]: {
            processing: true
          }
        }
      ]
    });

    expect(JSON.parse(o)).toEqual(JSON.parse("{\"a\":42,\"b\":[1,\"2\",false],\"c\":false,\"d\":true,\"e\":\"str\",\"f\":{\"a\":1,\"b\":false,\"c\":true},\"g\":[{\"a\":1,\"b\":false,\"c\":true,\"d\":\"str\",\"$$Symbol($status)\":{\"processing\":true}}],\"$$Symbol($status)\":{\"processing\":true}}"));
  });

  it("should return a serialized array with status symbol property", () => {
    const a = [1, 2, 3];

    a[symbolStatus] = 5;

    const o = serialize({
      a
    });

    expect(JSON.parse(o)).toEqual(JSON.parse("{\"a\":{\"$$arr\":{\"$\":[1,2,3],\"_\":{\"$$Symbol($status)\":5}}}}"));
  });
});

describe("deserialize", () => {
  it("should return a deserialized object", () => {
    expect(deserialize("{\"a\":42,\"b\":[1,\"2\",false],\"c\":false,\"d\":true,\"e\":\"str\",\"f\":{\"a\":1,\"b\":false,\"c\":true}}")).toEqual({
      a: 42,
      b: [1, "2", false],
      c: false,
      d: true,
      e: "str",
      f: {
        a: 1,
        b: false,
        c: true
      }
    });
  });

  it("should return a deserialized object with status", () => {
    expect(deserialize("{\"a\":42,\"b\":[1,\"2\",false],\"c\":false,\"d\":true,\"e\":\"str\",\"f\":{\"a\":1,\"b\":false,\"c\":true},\"g\":[{\"a\":1,\"b\":false,\"c\":true,\"d\":\"str\",\"$$Symbol($status)\":{\"processing\":true}}],\"$$Symbol($status)\":{\"processing\":true}}")).toEqual({
      a: 42,
      b: [1, "2", false],
      c: false,
      d: true,
      e: "str",
      f: {
        a: 1,
        b: false,
        c: true
      },
      [symbolStatus]: {
        processing: true
      },
      g: [
        {
          a: 1,
          b: false,
          c: true,
          d: "str",
          [symbolStatus]: {
            processing: true
          }
        }
      ]
    });
  });


  it("should return a deserialized object with array with status symbol property", () => {
    const a = [1, 2, 3];

    a[symbolStatus] = 5;

    expect(deserialize("{\"a\":{\"$$arr\":{\"$\":[1,2,3],\"_\":{\"$$Symbol($status)\":5}}}}")).toEqual({a});
  });
});

describe("getPayload", () => {
  it("should return undefined when no payload", () => {
    expect(getPayload({
      complete: true,
      processing: false
    })).toBe(undefined);
  });

  it("should return payload when payload with no error", () => {
    expect(getPayload({
      complete: true,
      processing: false
    }, {
      a: 42
    })).toEqual({a: 42});
  });

  it("should return payload when payload with no error", () => {
    expect(getPayload({
      complete: true,
      processing: false,
      error: new Error()
    }, {
      a: 42
    })).toBe(undefined);
  });
});
