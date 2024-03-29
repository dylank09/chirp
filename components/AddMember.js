import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { theme } from "../assets/Theme";
import TextAlert from "../components/TextAlert";
import ChirpButton from "./ChirpButton";

import { useCollectionData } from "react-firebase-hooks/firestore";

import firestore from "../config/FirestoreInit";

export default function AddMember({ currentMembers, fsRef }) {
  const [email, setEmail] = useState("");
  const [addMemberAlert, setAddMemberAlert] = useState("");

  const usersRef = firestore.collection("users");
  const query = usersRef.where("email", "==", email.toLowerCase());
  const [user] = useCollectionData(query, { idField: "userId" });

  function addMember() {
    setAddMemberAlert("");

    if (!validateEmail(email)) {
      setAddMemberAlert("Email address is invalid");
      return;
    }

    if (user && user.length > 0) {
      let userEmail = user[0].email;
      if (!currentMembers.includes(userEmail)) {
        // if the list of current members doesn't already include the email...
        let newMembers = currentMembers;
        newMembers.push(userEmail);
        // add the email to the list and update the firestore document
        fsRef.update({
          members: newMembers,
        });
        setEmail("");
        setAddMemberAlert("Successful");
      } else {
        setAddMemberAlert("User is already a member.");
      }
    } else {
      setAddMemberAlert("No user with that email exists");
    }
  }

  // helper function to validate email address structure
  const validateEmail = (e) => {
    // uses regex
    return String(e)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.optionsText}>Add member</Text>
      <View style={styles.addMember}>
        <TextInput
          style={styles.memberTextBox}
          placeholder="Email"
          placeholderTextColor={theme.colors.placeholderColor}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        <ChirpButton
          text="Add"
          onPress={() => addMember()}
          width="25%"
        ></ChirpButton>
      </View>
      <TextAlert text={addMemberAlert}></TextAlert>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  optionsText: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
  addMember: {
    borderRadius: 18,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    flexDirection: "row",
    margin: 7,
    width: "90%",
    justifyContent: "space-around",
    alignSelf: "center",
  },
  memberTextBox: {
    width: "60%",
    color: "white",
    fontSize: theme.dimensions.standardFontSize + 2,
    margin: 7,
  },
});
