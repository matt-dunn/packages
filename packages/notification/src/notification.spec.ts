import {notifyAction, Severity} from "./notification";

describe("notifyAction", () => {
  it("should create default notification action", () => {
    expect(notifyAction(new Error("Mock error"))).toEqual({
      "payload": {
        "message": "Mock error",
        "reason": undefined,
        "reference": undefined,
        "severity": "info",
      },
      "type": "@notification/NOTIFY",
    });
  });

  it("should create notification action with reason", () => {
    expect(notifyAction({
      message: "Mock error",
      reason: {
        type: "SOURCE_ACTION"
      }
    })).toEqual({
      "payload": {
        "message": "Mock error",
        "reason": {
          "type": "SOURCE_ACTION"
        },
        "reference": undefined,
        "severity": "info",
      },
      "type": "@notification/NOTIFY",
    });
  });

  it("should create notification action with reference", () => {
    expect(notifyAction({
      message: "Mock error",
      reference: "123"
    })).toEqual({
      "payload": {
        "message": "Mock error",
        "reason": undefined,
        "reference": "123",
        "severity": "info",
      },
      "type": "@notification/NOTIFY",
    });
  });

  it("should create notification action with default severity", () => {
    expect(notifyAction({
      message: "Mock error"
    })).toEqual({
      "payload": {
        "message": "Mock error",
        "reason": undefined,
        "reference": undefined,
        "severity": "info",
      },
      "type": "@notification/NOTIFY",
    });
  });

  it("should create notification action with WARNING severity", () => {
    expect(notifyAction({
      message: "Mock error",
      severity: Severity.warning
    })).toEqual({
      "payload": {
        "message": "Mock error",
        "reason": undefined,
        "reference": undefined,
        "severity": "warning",
      },
      "type": "@notification/NOTIFY",
    });
  });

  it("should create notification action with ERROR severity", () => {
    expect(notifyAction({
      message: "Mock error",
      severity: Severity.error
    })).toEqual({
      "payload": {
        "message": "Mock error",
        "reason": undefined,
        "reference": undefined,
        "severity": "error",
      },
      "type": "@notification/NOTIFY",
    });
  });
});
