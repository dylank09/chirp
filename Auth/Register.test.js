import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import Register from "./Register";

describe("<Register />", () => {
  const tree = renderer.create(<Register />).toJSON();

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("continue register button is present", () => {
    const { getByTestId } = render(<Register />);
    const foundButton = getByTestId("registerButton");
    expect(foundButton).toBeTruthy();
  });

  it("Google button is present", () => {
    const { getByTestId } = render(<Register />);
    const foundButton = getByTestId("googleButton");
    expect(foundButton).toBeTruthy();
  });

  it("navigate to login button is present", () => {
    const { getByTestId } = render(<Register />);
    const foundButton = getByTestId("navToLoginButton");
    expect(foundButton).toBeTruthy();
  });
});
