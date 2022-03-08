import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import ChirpTextBox from "./ChirpTextBox";

describe("<ChirpTextBox />", () => {
  const tree = renderer.create(<ChirpTextBox />).toJSON();

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("text box is present", () => {
    const { getByTestId } = render(<ChirpTextBox value="Testing" />);
    const foundButton = getByTestId("chirpTextBox");
    expect(foundButton).toBeTruthy();
  });
});
