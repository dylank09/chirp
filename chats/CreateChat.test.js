import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import CreateChat from "./CreateChat";

describe("<CreateChat />", () => {
  const tree = renderer.create(<CreateChat />).toJSON();

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("input name of chat box is present", () => {
    const { getByTestId } = render(<CreateChat />);
    const foundTextBox = getByTestId("nameBox");
    expect(foundTextBox).toBeTruthy();
  });

  it("create button is present", () => {
    const { getByTestId } = render(<CreateChat />);
    const foundButton = getByTestId("createChatButton");
    expect(foundButton).toBeTruthy();
  });
});
