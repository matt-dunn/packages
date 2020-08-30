import { expectSaga } from "redux-saga-test-plan";

import { sagaAsyncAction, makeCancelAction } from "./sagaAsyncAction";

describe("sagaNotification", () => {
  it("should handle successful async action", async () => {
    await expectSaga(sagaAsyncAction)
      .put.like({
        action: {
          type: "MOCK_ACTION",
          payload: undefined,
          meta: {
            $status: {
              processing: true,
              complete: false,
            }
          }
        }
      })
      .put.like({
        action:{
          type: "MOCK_ACTION",
          payload: 42,
          meta: {
            $status: {
              processing: false,
              complete: true,
            }
          }
        }
      })

      .dispatch({ type: "MOCK_ACTION", payload: Promise.resolve(42) })

      .run();
  });

  it("should handle failed async action", async () => {
    await expectSaga(sagaAsyncAction)
      .put.like({
        action: {
          type: "MOCK_ACTION",
          payload: undefined,
          meta: {
            $status: {
              processing: true,
              complete: false,
            }
          }
        }
      })
      .put.like({
        action:{
          type: "MOCK_ACTION",
          payload: new Error("Mock error"),
          error: true,
          meta: {
            $status: {
              processing: false,
              complete: false,
            }
          }
        }
      })

      .dispatch({ type: "MOCK_ACTION", payload: Promise.reject(new Error("Mock error")) })

      .run();
  });

  it("should cancel action", async () => {
    const controller = new AbortController();

    controller.abort();

    await expectSaga(sagaAsyncAction)
      .put.like({
        action: {
          type: "MOCK_ACTION",
          payload: undefined,
          meta: {
            $status: {
              processing: true,
              complete: false,
            }
          }
        }
      })
      .put.like({
        action:{
          type: "MOCK_ACTION",
          payload: undefined,
          meta: {
            $status: {
              processing: false,
              complete: false,
              cancelled: true
            }
          }
        }
      })

      .dispatch({
        type: "MOCK_ACTION",
        payload: Promise.resolve(42),
        meta: {
          controller
        }
      })

      .dispatch({
        type: makeCancelAction("MOCK_ACTION")
      })

      .run();
  });

  it("should cancel pending action", async () => {
    const controller = new AbortController();

    controller.abort();

    await expectSaga(sagaAsyncAction)
      .put.like({
        action: {
          type: "MOCK_ACTION",
          payload: undefined,
          meta: {
            $status: {
              processing: true,
              complete: false,
            }
          }
        }
      })
      .put.like({
        action:{
          type: "MOCK_ACTION",
          payload: undefined,
          meta: {
            $status: {
              processing: false,
              complete: false,
              cancelled: true
            }
          }
        }
      })
      .put.like({
        action:{
          type: "MOCK_ACTION",
          payload: undefined,
          meta: {
            $status: {
              processing: false,
              complete: false,
              cancelled: true
            }
          }
        }
      })

      .dispatch({
        type: "MOCK_ACTION",
        payload: Promise.resolve(42),
        meta: {
          controller
        }
      })

      .dispatch({
        type: "MOCK_ACTION",
        payload: Promise.resolve(42),
        meta: {
          controller
        }
      })
      .dispatch({
        type: makeCancelAction("MOCK_ACTION")
      })

      .run();
  });

  it("should not cancel with different ID pending action", async () => {
    const controller = new AbortController();

    controller.abort();

    await expectSaga(sagaAsyncAction)
      .put.like({
        action: {
          type: "MOCK_ACTION",
          payload: undefined,
          meta: {
            $status: {
              processing: true,
              complete: false,
            }
          }
        }
      })
      .put.like({
        action:{
          type: "MOCK_ACTION",
          payload: undefined,
          meta: {
            $status: {
              processing: false,
              complete: false,
              cancelled: true
            }
          }
        }
      })

      .dispatch({
        type: "MOCK_ACTION",
        payload: Promise.resolve(42),
        meta: {
          controller
        }
      })

      .dispatch({
        type: "MOCK_ACTION",
        payload: Promise.resolve(42),
        meta: {
          controller
        }
      })
      .dispatch({
        type: makeCancelAction("MOCK_ACTION"),
        meta: {
          id: "123"
        }
      })

      .run();
  });
});
