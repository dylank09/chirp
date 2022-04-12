import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { theme } from "../assets/Theme";
import LoadingScreen from "../components/LoadingScreen";
import Statistics from "./Statistics";

import { useDocumentData } from "react-firebase-hooks/firestore";

import firebase from "firebase";
import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";
import ChirpButton from "../components/ChirpButton";

export default function Profile() {
  const { uid, displayName } = auth.currentUser;
  // get the user's google profile photo URL
  var photoURL = auth.currentUser.photoURL;

  const userRef = firestore.collection("users").doc(uid);
  const [user, loading] = useDocumentData(userRef);

  // here we check if there exists a "profileURL" field in the user document
  // if so, it means that they have uploaded a profile image already
  if (user && user.profileURL) {
    photoURL = user.profileURL;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // here we launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // once an image is picked and placed into result, we handle it
    handleImagePicked(result);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      // ensure the picking wasnt cancelled
      if (!pickerResult.cancelled) {
        // upload the image to firebase and return the URL it was uploaded to
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setUserProfileURL(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    }
  };

  // helper method to update (or add) the profileURL field on the users document on firestore
  const setUserProfileURL = (url) => {
    userRef.update({
      profileURL: url,
    });
  };

  async function uploadImageAsync(uri) {
    // create a blob with a promise uses XHR
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // get the file extension, e.g. png, jpg...
    var fileType = uri.substring(uri.indexOf("/") + 1, uri.indexOf(";"));

    var currentTime = Date.now();

    // create a reference on firebase storage. file name is unique since
    var ref = firebase
      .storage()
      .ref()
      .child(currentTime + "." + fileType);
    // put the blob in the new reference
    await ref.put(blob);

    // return the resuting url
    return ref.getDownloadURL();
  }

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          {/* if photoURL null we show the first letter of the user's name instead */}
          {photoURL ? (
            <Image
              style={styles.profileImage}
              source={{ uri: photoURL }}
            ></Image>
          ) : (
            <View style={styles.profileImage}>
              <Text style={styles.profileText}>
                {user ? user.name.slice(0, 1) : "F"}
              </Text>
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
          <ChirpButton
            text="Sign out"
            style={styles.option}
            onPress={() => auth.signOut()}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              paddingLeft: 4,
              paddingBottom: 2,
              color: theme.colors.hazeText,
              borderBottomColor: theme.colors.hazeText,
              borderBottomWidth: 1,
            }}
          >
            Options
          </Text>
          <ChirpButton
            style={styles.option}
            text="Change Profile Image"
            onPress={() => pickImage()}
          />
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
