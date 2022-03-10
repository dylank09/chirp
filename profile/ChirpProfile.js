import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { theme } from "../assets/Theme";
import LoadingScreen from "../components/LoadingScreen";
import Statistics from "./Statistics";

import { useDocumentData } from "react-firebase-hooks/firestore";

import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";
import ChirpButton from "../components/ChirpButton";

export default function Profile() {
  const [image, setImage] = useState(null);

  const { uid, photoURL, displayName } = auth.currentUser;

  const userRef = firestore.collection("users").doc(uid);
  const [user, loading] = useDocumentData(userRef);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (loading) {
    return <LoadingScreen />;
    // } else if (editClicked) {
    //   return (
    //     <EditProfile
    //       userData={user}
    //       userRef={userRef}
    //       onBackPress={() => setEditClicked(false)}
    //     />
    //   );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          {photoURL ? (
            <Image
              style={styles.profileImage}
              source={{ uri: photoURL }}
            ></Image>
          ) : (
            <View style={styles.profileImage}>
              <Text style={styles.profileText}>{user.name.slice(0, 1)}</Text>
            </View>
          )}
          <View style={styles.profileInfo}>
            <Text style={styles.displayName}>
              {user ? user.name : displayName}
            </Text>
            <Text style={styles.createdAt}>
              Created at:{" "}
              {auth.currentUser.metadata.creationTime.substring(5, 22)}
            </Text>
            <Text style={styles.createdAt}>
              Last Sign In:{" "}
              {auth.currentUser.metadata.lastSignInTime.substring(5, 22)}
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <ChirpButton
              style={styles.option}
              text="Change Avatar"
              onPress={() => pickImage()}
            />
            <ChirpButton
              text="Sign out"
              style={styles.option}
              onPress={() => auth.signOut()}
            />
          </View>
        </View>
        <View style={styles.options}>
          {/* <Text style={styles.option} onPress={() => setEditClicked(true)}>
            Edit profile
          </Text> */}

          {/* <ChirpSwitch
            text="Enable light mode"
            value={lightMode}
            setValue={setLightMode}
          /> */}
        </View>
        <Statistics />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "space-around",
  },
  profileHeader: {
    flexDirection: "row",
    height: 100,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: theme.colors.hazeText,
    borderWidth: 0.8,
    justifyContent: "center",
  },
  profileText: {
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize + 14,
    textAlign: "center",
  },
  displayName: {
    fontSize: theme.dimensions.standardFontSize + 5,
    color: theme.colors.text,
  },
  profileInfo: {
    flexDirection: "column",
    margin: 18,
  },
  createdAt: {
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize - 4,
  },
  options: {
    marginTop: 20,
  },
  option: {
    fontSize: theme.dimensions.standardFontSize + 1,
    color: theme.colors.text,
    width: "100%",
    padding: 7,
  },
});
