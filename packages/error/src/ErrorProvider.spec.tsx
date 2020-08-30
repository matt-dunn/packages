import {shallow} from "enzyme";
import {ErrorProvider as Component} from "./ErrorProvider";
import React from "react";

describe("ErrorBoundary", () => {
  it("should render with no error", () => {
    const wrapper = shallow(
      <Component
        value={{
          error: undefined
        }}
      >
        Simple
      </Component>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should render with error", () => {
    const wrapper = shallow(
      <Component
        value={{
          error: new Error("Mock error")
        }}
      >
        Simple
      </Component>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
