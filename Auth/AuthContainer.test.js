import React from "react";
import renderer from "react-test-renderer";

import AuthContainer from "./AuthContainer";

describe("<AuthContainer />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<AuthContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
