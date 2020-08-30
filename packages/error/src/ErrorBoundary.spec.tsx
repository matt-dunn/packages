/** !
 * Copyright (c) 2019, Matt Dunn
 *
 * @author Matt Dunn
 */

import React from "react";
import { shallow } from "enzyme";

import { ErrorBoundaryUnWrapped as Component } from "./ErrorBoundary";

const SimpleError = ({ error }: {error: Error}) => (
  <>
    <h1>An error occurred</h1>
    <p>
      DEBUG:
      {error.message}
    </p>
  </>
);

describe("ErrorBoundary", () => {
  it("should render correctly", () => {
    const wrapper = shallow(
      <Component
        ErrorComponent={SimpleError}
      >
        Simple
      </Component>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should correctly show error", () => {
    const MockComponent = () => null;

    const handler = jest.fn();

    const wrapper = shallow(
      <Component
        ErrorComponent={SimpleError}
        handler={handler}
      >
        <MockComponent />
      </Component>,
    );

    const error = new Error("Mock error");

    wrapper.find(MockComponent).simulateError(error);

    expect(wrapper).toMatchSnapshot();

    expect(handler).not.toHaveBeenCalled();
  });

  it("should call error handler", () => {
    const MockComponent = () => null;

    const handler = jest.fn();

    const wrapper = shallow(
      <Component
        ErrorComponent={SimpleError}
        handler={handler}
      >
        <MockComponent />
      </Component>,
    );

    const error = new Error("Mock error");

    wrapper.find(MockComponent).simulateError(error);

    const event = new CustomEvent("actionError", {
      bubbles: true,
      cancelable: true,
      detail: {
        type: "ERR",
        error: new Error("Err")
      }
    });

    const cancelled = !window.dispatchEvent(event);

    expect(wrapper).toMatchSnapshot();

    expect(handler).toBeCalledWith( new Error("Err"), expect.any(String), undefined, expect.any(Object), expect.any(Function));

    expect(cancelled).toBe(false);
  });

  it("should call error handler with cancelled", () => {
    const MockComponent = () => null;

    const handler = jest.fn(() => true);

    const wrapper = shallow(
      <Component
        ErrorComponent={SimpleError}
        handler={handler}
      >
        <MockComponent />
      </Component>,
    );

    const error = new Error("Mock error");

    wrapper.find(MockComponent).simulateError(error);

    const event = new CustomEvent("actionError", {
      bubbles: true,
      cancelable: true,
      detail: {
        type: "ERR",
        error: new Error("Err")
      }
    });

    const cancelled = !window.dispatchEvent(event);

    expect(wrapper).toMatchSnapshot();

    expect(handler).toBeCalledWith( new Error("Err"), expect.any(String), undefined, expect.any(Object), expect.any(Function));

    expect(cancelled).toBe(true);
  });
});
