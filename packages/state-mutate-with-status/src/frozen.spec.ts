import updateState from "./frozen";

import {StandardAction} from "./types";
import {symbolStatus} from "./status";

describe("frozenUpdateState", () => {
  let state: any;

  beforeEach(() => {
    state = {
      item: {
        id: 1,
        text: "item 1"
      },
      nested: {
        deep: {
          item: {
            id: 1,
            text: "item 1"
          }
        }
      }
    };
  });

  it("should return immutable state", () => {
    const actionProcessing: StandardAction = {
      type: "TEST",
      payload: { text: "item 1 updated" },
      meta: {
        $status: {
          transactionId: "123",
          processing: true,
          complete: false
        }
      }
    };

    const updatedState = updateState(state, actionProcessing, {
      path: ["item"]
    });

    expect(updatedState).toMatchObject({
      item: {
        text: "item 1 updated",
        [symbolStatus]: {
          complete: false,
          processing: true
        }
      }
    });

    expect(() => {
      updatedState.item.id = 42;
    }).toThrow(/Cannot assign to read only property 'id' of object/);
  });
});
