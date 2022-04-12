import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import ChirpButton from "../components/ChirpButton";
import FadeIn from "react-native-fade-in-image";

import { theme } from "../assets/Theme";
import tutorial1 from "../assets/tutorial1.png";
import tutorial2 from "../assets/tutorial2.png";
import tutorial3 from "../assets/tutorial3.png";

export default function Tutorial({ navigation }) {
  // create the image array
  var images = [tutorial1, tutorial2, tutorial3];

  var numImages = images.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  function nextPressed() {
    // when we arent at the end of the image array, add one to the currentIndex state variable
    if (currentIndex < numImages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function navToRegister() {
    navigation.navigate("Register");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tutorial</Text>
      <FadeIn
        style={{
          height: "85%",
          width: "85%",
        }}
      >
        {/* We set the image source to the current tutorial image */}
        <Image
          style={styles.tutorial}
          source={images[currentIndex]}
          resizeMode="contain"
        ></Image>
      </FadeIn>
      {/* here we either show Skip and Next button or Exit button on the last image */}
      {currentIndex < numImages - 1 ? (
        <View style={styles.bottomButtons}>
          <ChirpButton onPress={navToRegister} width="30%" text="Skip" />
          <ChirpButton onPress={nextPressed} width="30%" text="Next" />
        </View>
      ) : (
        <ChirpButton onPress={navToRegister} width="30%" text="Exit" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.hazeText,
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: {
    fontSize: theme.dimensions.standardFontSize + 7,
    color: theme.colors.jet,
    fontWeight: "bold",
  },
  tutorial: {
    borderRadius: 30,
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    shadowColor: "#000",
    // blurRadius: 250,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
