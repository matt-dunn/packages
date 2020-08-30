import { sagaNotification } from "./sagaNotification";

describe("sagaNotification", () => {
  it("should call notify callback", () => {
    const notify = jest.fn();

    const saga = sagaNotification(notify);

    saga.next();

    saga.next({
      type: "@notification/NOTIFY",
      payload: "NOTIFICATION"
    });

    expect(notify).toBeCalledWith("NOTIFICATION");
  });

  it("should call notify and meta notification callbacks", () => {
    const notify = jest.fn();

    const notification = jest.fn();

    const saga = sagaNotification(notify);

    saga.next();

    saga.next({
      type: "MOCK_ACTION",
      payload: new Error("Mock error"),
      error: true,
      meta: {
        mockMeta: "MOCK META",
        notification
      }
    });

    expect(notify).not.toHaveBeenCalled();

    expect(notification).toBeCalledWith(undefined, new Error("Mock error"), {
      mockMeta: "MOCK META"
    });
  });

  it("should call notify and meta notification callbacks with returned callback value", () => {
    const notify = jest.fn();

    const notification = jest.fn().mockReturnValue("NOTIFICATION");

    const saga = sagaNotification(notify);

    saga.next();

    saga.next({
      type: "MOCK_ACTION",
      payload: new Error("Mock error"),
      error: true,
      meta: {
        mockMeta: "MOCK META",
        notification
      }
    });

    expect(notify).toBeCalledWith("NOTIFICATION");

    expect(notification).toBeCalledWith(undefined, new Error("Mock error"), {
      mockMeta: "MOCK META"
    });
  });

  it("should call notify when complete", () => {
    const notify = jest.fn();

    const saga = sagaNotification(notify);

    saga.next();

    saga.next({
      type: "MOCK_ACTION",
      payload: new Error("Mock error"),
      meta: {
        mockMeta: "MOCK META",
        notification: "NOTIFICATION",
        $status: {
          complete: true
        }
      }
    });

    expect(notify).toBeCalledWith("NOTIFICATION");
  });

  it("should call notify when complete", () => {
    const notify = jest.fn();

    const saga = sagaNotification(notify);

    saga.next();

    saga.next({
      type: "MOCK_ACTION",
      payload: new Error("Mock error"),
      error: true,
      meta: {
        mockMeta: "MOCK META",
        $status: {
          error: {
            message: "Mock error",
            code: 42,
            severity: "SEVERITY",
            status: 500
          }
        }
      }
    });

    expect(notify).toBeCalledWith({
      "message": "Mock error",
      "reference": 42,
      "severity": "error",
      "type": "MOCK_ACTION"
    });
  });

  it("should call notify when complete and shouldNotifyError returns true", () => {
    const notify = jest.fn();

    const saga = sagaNotification(notify, {
      shouldNotifyError: () => true
    });

    saga.next();

    saga.next({
      type: "MOCK_ACTION",
      payload: new Error("Mock error"),
      error: true,
      meta: {
        mockMeta: "MOCK META",
        $status: {
          error: {
            message: "Mock error",
            code: 42,
            severity: "SEVERITY",
            status: 500
          }
        }
      }
    });

    expect(notify).toBeCalledWith({
      "message": "Mock error",
      "reference": 42,
      "severity": "error",
      "type": "MOCK_ACTION"
    });
  });

  it("should not call notify when complete and shouldNotifyError returns false", () => {
    const notify = jest.fn();

    const saga = sagaNotification(notify, {
      shouldNotifyError: () => false
    });

    saga.next();

    saga.next({
      type: "MOCK_ACTION",
      payload: new Error("Mock error"),
      error: true,
      meta: {
        mockMeta: "MOCK META",
        $status: {
          error: {
            message: "Mock error",
            code: 42,
            severity: "SEVERITY",
            status: 500
          }
        }
      }
    });

    expect(notify).not.toHaveBeenCalled();
  });
});
