import {symbolStatus} from "./status";

import {getUpdatedState} from "./getUpdatedState";

describe("getUpdatedState", () => {
  it("should not insert new item into array", () => {
    const updatedState = getUpdatedState(
      {
        a: [{id: "1", b: 1}]
      },
      {id: "2", b: 42},
      {
        complete: true,
        processing: false
      },
      ["a"],
      "2",
      {
        autoInsert: false
      }
    );

    expect(JSON.parse(JSON.stringify(updatedState))).toEqual({
      updatedState:
        {"a": [
            {"id": "1","b": 1}
          ]
        },
      originalPathState: [
        {"id": "1","b": 1}
      ],
      isBaseObject: false
    });
  });

  it("should insert new item into array", () => {
    const updatedState = getUpdatedState(
      {
        a: [{id: "1", b: 1}]
      },
      {id: "2", b: 42},
      {
        complete: true,
        processing: false
      },
      ["a"],
      "2",
      {
        autoInsert: true
      }
    );

    expect(JSON.parse(JSON.stringify(updatedState))).toEqual({
      updatedState:
        {"a": [
            {"id": "1","b": 1},
            {"id": "2","b": 42}
          ]
        },
      originalPathState: [
        {"id": "1","b": 1}
      ],
      isBaseObject: false
    });

    // Test array object has correct status
    expect(updatedState.updatedState.a[1][symbolStatus]).toMatchObject({
      complete: true,
      processing: false
    });
  });
});
