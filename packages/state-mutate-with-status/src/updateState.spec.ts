import {updateState} from "./updateState";
import {StandardAction} from "./types";
import {symbolStatus} from "./status";

describe("updateState", () => {
  describe("Object state", () => {
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

    it("should update payload when not complete", () => {
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

      expect(updateState(state, actionProcessing, {
        path: ["item"]
      })).toMatchObject({
        item: {
          text: "item 1 updated",
          [symbolStatus]: {
            complete: false,
            processing: true
          }
        }
      });
    });

    it("should update payload when complete", () => {
      const actionComplete: StandardAction = {
        type: "TEST",
        payload: { text: "item 1 updated" },
        meta: {
          $status: {
            transactionId: "123",
            processing: false,
            complete: false
          }
        }
      };

      expect(updateState(state, actionComplete, {
        path: ["item"]
      })).toMatchObject({
        item: {
          text: "item 1 updated",
          [symbolStatus]: {
            complete: true,
            processing: false
          }
        }
      });
    });

    it("should update payload when using default status", () => {
      const actionWithDefaultStatus: StandardAction = {
        type: "TEST",
        payload: { text: "item 1 updated" }
      };

      expect(updateState(state, actionWithDefaultStatus, {
        path: ["item"]
      })).toMatchObject({
        item: {
          text: "item 1 updated"
        }
      });
    });

    it("should update nested payload when not complete", () => {
      const actionNestedState: StandardAction = {
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

      expect(updateState(state, actionNestedState, {
        path: ["nested", "deep", "item"]
      })).toMatchObject({
        nested: {
          deep: {
            item: {
              text: "item 1 updated",
              [symbolStatus]: {
                complete: false,
                processing: true,
              }
            }
          }
        }
      });
    });

    it("should update nested payload when complete", () => {
      const actionNestedStateComplete: StandardAction = {
        type: "TEST",
        payload: { text: "item 1 updated" },
        meta: {
          $status: {
            transactionId: "123",
            processing: false,
            complete: false
          }
        }
      };

      expect(updateState(state, actionNestedStateComplete, {
        path: ["nested", "deep", "item"]
      })).toMatchObject({
        nested: {
          deep: {
            item: {
              text: "item 1 updated",
              [symbolStatus]: {
                complete: true,
                processing: false
              }
            }
          }
        }
      });
    });
  });

  describe("Array state", () => {
    let state: any;

    beforeEach(() => {
      state = {
        items: [
          {
            id: "1",
            text: "item 1"
          }
        ]
      };
    });

    it("should update payload when not complete", () => {
      const actionProcessing: StandardAction = {
        type: "TEST",
        payload: { text: "item 1 updated" },
        meta: {
          id: "1",
          $status: {
            transactionId: "123",
            processing: true,
            complete: false
          }
        }
      };

      expect([...updateState(state, actionProcessing, {
        path: ["items"]
      }).items]).toMatchObject([
        {
          text: "item 1 updated",
        }
      ]);
    });

    it("should update payload when complete", () => {
      const actionComplete: StandardAction = {
        type: "TEST",
        payload: { text: "item 1 updated" },
        meta: {
          id: "1",
          $status: {
            transactionId: "123",
            processing: false,
            complete: false
          }
        }
      };

      expect([...updateState(state, actionComplete, {
        path: ["items"]
      }).items]).toMatchObject([
        {
          text: "item 1 updated",
          [symbolStatus]: {
            complete: true,
            processing: false
          }
        }
      ]);
    });

    it("should add a new item to the end of the array by default when complete ", () => {
      const actionCompleteNewItem: StandardAction = {
        type: "TEST",
        payload: { text: "item 2" },
        meta: {
          id: "2",
          $status: {
            transactionId: "123",
            processing: false,
            complete: false
          }
        }
      };

      expect([...updateState(state, actionCompleteNewItem, {
        path: ["items"],
        autoDelete: true,
        autoInsert: true
      }).items]).toMatchObject([
        {
          text: "item 1"
        },
        {
          text: "item 2"
        }
      ]);
    });

    it("should add a new item to the specified index in the array when complete ", () => {
      const actionCompleteNewItemFirst: StandardAction = {
        type: "TEST",
        payload: { text: "item 2 updated" },
        meta: {
          id: "2",
          $status: {
            transactionId: "123",
            processing: false,
            complete: false
          }
        }
      };

      expect([...updateState(state, actionCompleteNewItemFirst, {
        path: ["items"],
        autoDelete: true,
        autoInsert: true,
        getNewItemIndex: (/*items, item*/) => 0,
      }).items]).toMatchObject([
        {
          text: "item 2 updated"
        },
        {
          text: "item 1"
        }
      ]);
    });
  });

  describe("Multiple transactions", () => {
    it("should handle multiple transactions", () => {
      const state = {
        items: [
          {
            id: "1",
            text: "item 1"
          }
        ]
      };

      const actionProcessingFirst: StandardAction = {
        type: "TEST",
        payload: { text: "item 1 updated" },
        meta: {
          id: "1",
          $status: {
            transactionId: "1",
            processing: true,
            complete: false
          }
        }
      };

      const updatedState = updateState(state, actionProcessingFirst, {
        path: ["items"]
      });

      expect([...updatedState.items]).toMatchObject([
        {
          text: "item 1 updated",
        }
      ]);

      const actionProcessingSecond: StandardAction = {
        type: "TEST",
        payload: { text: "item 1 updated" },
        meta: {
          id: "1",
          $status: {
            transactionId: "2",
            processing: true,
            complete: false
          }
        }
      };

      expect([...updateState(updatedState, actionProcessingSecond, {
        path: ["items"]
      }).items]).toMatchObject([
        {
          text: "item 1 updated",
        }
      ]);
    });
  });
});
