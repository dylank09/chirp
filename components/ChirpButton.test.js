import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import ChirpButton from "./ChirpButton";

describe("<ChirpButton />", () => {
  const tree = renderer.create(<ChirpButton />).toJSON();

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("button is present", () => {
    const { getByTestId } = render(
      <ChirpButton
        onPress={() => console.log("pressed")}
        width="50%"
        text="Testing Button"
      />
    );
    const foundButton = getByTestId("button");
    expect(foundButton).toBeTruthy();
  });
});
