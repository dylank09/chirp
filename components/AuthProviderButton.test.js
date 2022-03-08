import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";

import AuthProviderButton from "./AuthProviderButton";

describe("<AuthProviderButton />", () => {
  const tree = renderer.create(<AuthProviderButton />).toJSON();

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("button is present", () => {
    const { getByTestId } = render(
      <AuthProviderButton
        onPress={() => console.log("pressed")}
        type="google"
        text="Testing Button"
      />
    );
    const foundButton = getByTestId("button");
    expect(foundButton).toBeTruthy();
  });
});
