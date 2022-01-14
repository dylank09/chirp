import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import app from "../config/FirebaseConfig";
import ChirpButton from "../components/ChirpButton";
import TextAlert from "../components/TextAlert";
import FormatTime from "../functions/FormatTime";

const firestore = firebase.firestore(app);

export default function ChatOptions({
  name,
  id,
  returnToChat,
  chatData,
  returnToMain,
}) {
  const [email, setEmail] = useState("");
  const [addMemberAlert, setAddMemberAlert] = useState("");

  const usersRef = firestore.collection("users");
  const chatRef = firestore.collection("chatGroups").doc(id);

  const query = usersRef.where("email", "==", email);
  const [user] = useCollectionData(query, { idField: "userid" });
  const [users] = useCollectionData(usersRef, { idField: "userid" });

  var members = [];
  chatData.members.forEach((mem) => {
    members.push(findUser(mem));
  });

  function findUser(userid) {
    if (users) {
      for (const u of users) {
        if (userid == u.userid) {
          return u.email;
        }
      }
    }
    return "";
  }

  function addMember() {
    setAddMemberAlert("");

    if (!user[0]) {
      setAddMemberAlert("No user with that email exists");
      return;
    }

    let userid = user[0].userid;
    if (!chatData.members.includes(userid)) {
      let newMembers = chatData.members;
      newMembers.push(userid);
      chatRef.update({
        members: newMembers,
      });
      setEmail("");
      setAddMemberAlert("Successful");
    } else {
      setAddMemberAlert("User is already in the chat");
    }
  }

  function deleteChat() {
    chatRef.delete();
    returnToMain();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="left" size={24} color="white" onPress={returnToChat} />
        <Text style={styles.chatName}>{name}</Text>
        <AntDesign name="left" size={24} color={theme.colors.background} />
      </View>
      <Text style={styles.chatInfo}>
        {" "}
        {chatData.createdAt
          ? "Created on: " + FormatTime(chatData.createdAt)
          : ""}
      </Text>
      <View style={styles.memberList}>
        <Text style={styles.optionsText}>Members List</Text>
        {members &&
          members.map((mem, i) => (
            <Text key={i} style={styles.member}>
              {mem}
            </Text>
          ))}
      </View>
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

      <View style={styles.deleteButton}>
        <ChirpButton
          onPress={deleteChat}
          width="60%"
          text="Delete Chat"
        ></ChirpButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginVertical: 20,
    alignSelf: "center",
  },
  chatName: {
    color: theme.colors.text,
    fontWeight: "500",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
  memberList: {
    marginBottom: 30,
  },
  optionsText: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
  member: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 0.5,
    padding: 4,
    marginVertical: 5,
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
  chatInfo: {
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize - 2,
    alignSelf: "center",
    marginBottom: 30,
  },
  deleteButton: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
});
