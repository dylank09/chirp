import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import ChirpChat from "./ChirpChat";

describe("<ChirpChat />", () => {
  const tree = renderer.create(<ChirpChat />).toJSON();

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("loading screen is present", () => {
    const { getByTestId } = render(<ChirpChat />);
    const foundElement = getByTestId("loading");
    expect(foundElement).toBeTruthy();
  });

  //   it("help text is present", () => {
  //     const { getByTestId } = render(<ChirpChat />);
  //     const foundText = getByTestId("noChatsHelpText");
  //     expect(foundText).toBeTruthy();
  //   });

  //   it("back button is present", () => {
  //     const { getByTestId } = render(<ChirpChat />);
  //     const foundButton = getByTestId("backButton");
  //     expect(foundButton).toBeTruthy();
  //   });

  //   it("chat name is present", () => {
  //     const { getByTestId } = render(<ChirpChat />);
  //     const foundButton = getByTestId("chatName");
  //     expect(foundButton).toBeTruthy();
  //   });

  //   it("send text box is present", () => {
  //     const { getByTestId } = render(<ChirpChat />);
  //     const foundElement = getByTestId("sendTextBox");
  //     expect(foundElement).toBeTruthy();
  //   });
});
