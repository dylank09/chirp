import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { theme } from "../assets/Theme";
import ChirpPreview from "./ChirpPreview";
import SearchBar from "../components/SearchBar";
import ChirpChat from "./ChirpChat";
import app from "../config/FirebaseConfig";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function ChirpGroups() {
  const [clicked, setClicked] = useState(false);
  const [chatId, setChatId] = useState();

  const uid = auth.currentUser.uid;

  const chatsRef = firestore.collection("chatGroups");
  const query = chatsRef.where("members", "array-contains", uid);
  const [groups, loading] = useCollectionData(query);

  function goToChat(id) {
    setChatId(id);
    setClicked(true);
  }

  function backToGroups() {
    setClicked(false);
    setChatId(0);
  }

  return (
    <View style={styles.outerContainer}>
      {clicked ? (
        <ChirpChat id={chatId} onBackPress={backToGroups} />
      ) : (
        <SafeAreaView style={styles.container}>
          <SearchBar></SearchBar>
          {groups &&
            groups.map((grp) => (
              <ChirpPreview
                key={grp.createdAt}
                chatName={grp.name}
                previewText={grp.lastMessage}
                previewtimestamp={grp.lastMessageTimestamp}
                notOpened={grp.membersUnseen.includes(uid)}
                onPress={() => goToChat(1)}
              />
            ))}
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
  outerContainer: {
    height: "100%",
    width: "100%",
  },
});
