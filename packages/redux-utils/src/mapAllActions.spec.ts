import {Dispatch} from "redux";

import {mapAllActions} from "./mapAllActions";

describe("mapAllActions", () => {
  it("should return empty object when no actions", () => {
    expect(mapAllActions({} as Dispatch, {})).toEqual({});
  });

  it("should return mapped action creators", () => {
    const actions = mapAllActions((a => a) as Dispatch, {
      "action1": {
        a: () => "Mock payload action1.a",
        b: () => "Mock payload action1.b"
      },
      "action2": {
        a: () => "Mock payload action2.a",
        b: () => "Mock payload action2.b"
      }
    });

    expect(actions.action1.a()).toEqual("Mock payload action1.a");
    expect(actions.action1.b()).toEqual("Mock payload action1.b");

    expect(actions.action2.a()).toEqual("Mock payload action2.a");
    expect(actions.action2.b()).toEqual("Mock payload action2.b");
  });
});
