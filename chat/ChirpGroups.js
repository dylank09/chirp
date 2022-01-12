import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { theme } from "../assets/Theme";
import ChirpPreview from "./ChirpPreview";
import SearchBar from "../components/SearchBar";
import ChirpChat from "./ChirpChat";
import app from "../config/FirebaseConfig";
import CreateChatButton from "../components/CreateChatButton";
import CreateChirpChat from "./CreateChirpChat";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function ChirpGroups() {
  const [chatClicked, setChatClicked] = useState(false);
  const [createClicked, setCreateClicked] = useState(false);
  const [chatId, setChatId] = useState();
  const [chatName, setChatName] = useState("");

  const uid = auth.currentUser.uid;
  const chatsRef = firestore.collection("chatGroups");
  const query = chatsRef.where("members", "array-contains", uid);
  const [groups] = useCollectionData(query, { idField: "chatId" });

  function goToChat(id, name) {
    setChatId(id);
    setChatClicked(true);
    setChatName(name);
    setChatOpenedByUser(id);
  }

  function goToCreateChat() {
    setCreateClicked(true);
  }

  function backToGroups() {
    setChatClicked(false);
    setCreateClicked(false);
    setChatId(0);
  }

  function removeElementFromArray(element, array) {
    const index = array.indexOf(element);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  }

  function setChatOpenedByUser(id) {
    var groupIndex = -1;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].chatId == id) {
        groupIndex = i;
        break;
      }
    }
    if (groupIndex == -1) {
      return false;
    }

    let unseen = groups[groupIndex].membersUnseen;
    let updateUnseen = removeElementFromArray(uid, unseen);

    chatsRef.doc(id).update({
      membersUnseen: updateUnseen,
    });
    return true;
  }

  return (
    <View style={styles.outerContainer}>
      {(() => {
        if (chatClicked) {
          return (
            <ChirpChat id={chatId} name={chatName} onBackPress={backToGroups} />
          );
        } else if (createClicked) {
          return (
            <CreateChirpChat onBackPress={backToGroups} goToChat={goToChat} />
          );
        } else {
          return (
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <SearchBar></SearchBar>
                <CreateChatButton onPress={goToCreateChat}></CreateChatButton>
              </View>
              <ScrollView style={styles.groupsScroll}>
                {groups &&
                  groups.map((grp) => (
                    <ChirpPreview
                      key={grp.chatId}
                      chatName={grp.name}
                      previewText={grp.lastMessage ? grp.lastMessage : ""}
                      previewtimestamp={
                        grp.lastMessageTimestamp
                          ? grp.lastMessageTimestamp.seconds
                          : ""
                      }
                      notOpened={grp.membersUnseen.includes(uid)}
                      onPress={() => goToChat(grp.chatId, grp.name)}
                    />
                  ))}
              </ScrollView>
            </SafeAreaView>
          );
        }
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
  groupsScroll: {
    width: "100%",
  },
  outerContainer: {
    height: "100%",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginVertical: 20,
  },
});
