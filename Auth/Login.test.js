import React from "react";
import { render } from "@testing-library/react-native";
import renderer from "react-test-renderer";

import Login from "./Login";

describe("<Login />", () => {
  const tree = renderer.create(<Login />).toJSON();

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("keyboard avoid view contains five children", () => {
    expect(tree.children[2].children).toHaveLength(5);
  });

  it("continue login button is present", () => {
    const { getByTestId } = render(<Login />);
    const foundButton = getByTestId("loginButton");
    expect(foundButton).toBeTruthy();
  });

  it("Google button is present", () => {
    const { getByTestId } = render(<Login />);
    const foundButton = getByTestId("googleButton");
    expect(foundButton).toBeTruthy();
  });

  it("navigate to register button is present", () => {
    const { getByTestId } = render(<Login />);
    const foundButton = getByTestId("navToRegisterButton");
    expect(foundButton).toBeTruthy();
  });
});
