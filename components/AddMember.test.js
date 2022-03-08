import React from "react";
import renderer from "react-test-renderer";
// import { render } from "@testing-library/react-native";

import AddMember from "./AddMember";

describe("<AddMember />", () => {
  const tree = renderer.create(<AddMember />).toJSON();

  it("renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  //   it("user is present", () => {
  //     const { getByTestId } = render(<AddMember user="Testing User" />);
  //     const foundUser = getByTestId("user");
  //     expect(foundUser).toBeTruthy();
  //   });
});
