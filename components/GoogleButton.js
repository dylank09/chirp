import React from "react";
import { StyleSheet } from "react-native";
import { SocialIcon } from "react-native-elements";

export default function GoogleButton(props) {
  return (
    <SocialIcon
      title="Sign in with Google"
      button={true}
      name="google"
      style={styles.button}
      type="google"
      underlayColor="black"
      light
      iconStyle={styles.buttonContents}
      fontStyle={styles.buttonContents}
      onPress={props.onPress}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 15,
  },
  buttonContents: {
    color: "black",
  },
});
