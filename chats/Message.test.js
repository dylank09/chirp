import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import Message from "./Message";

describe("<Message />", () => {
  const tree = renderer.create(<Message />).toJSON();

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("user is present", () => {
    const { getByTestId } = render(<Message user="Testing User" />);
    const foundUser = getByTestId("user");
    expect(foundUser).toBeTruthy();
  });

  it("time is present", () => {
    const { getByTestId } = render(<Message timestamp={1613748319} />);
    const foundTime = getByTestId("time");
    expect(foundTime).toBeTruthy();
  });

  it("text is present", () => {
    const { getByTestId } = render(<Message text="Testing message" />);
    const foundText = getByTestId("message");
    expect(foundText).toBeTruthy();
  });
});
