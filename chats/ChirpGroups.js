import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";

import { theme } from "../assets/Theme";
import ChatPreview from "./ChatPreview";
import SearchBar from "../components/SearchBar";
import ChirpChat from "./ChirpChat";
import CreateButton from "../components/CreateButton";
import CreateChat from "./CreateChat";

import { useCollectionData } from "react-firebase-hooks/firestore";

import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";

export default function ChirpGroups() {
  const [chatClicked, setChatClicked] = useState(false);
  const [createClicked, setCreateClicked] = useState(false);
  const [chatId, setChatId] = useState();
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");

  const { email } = auth.currentUser;
  const chatsRef = firestore.collection("chatGroups");
  const query = chatsRef.where("members", "array-contains", email);
  const [groups] = useCollectionData(query, { idField: "chatId" });

  let chatGroups;

  if (groups) {
    groups.sort(function (a, b) {
      return b.lastMessageTimestamp - a.lastMessageTimestamp;
    });
    chatGroups = groups;
  }

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
    let updateUnseen = removeElementFromArray(email, unseen);

    chatsRef.doc(id).update({
      membersUnseen: updateUnseen,
    });
    return true;
  }

  if (search.length > 0) {
    const matches = groups.filter((group) => {
      if (group.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
        return true;
      }
    });
    chatGroups = matches;
  } else {
    chatGroups = groups;
  }

  return (
    <View style={styles.outerContainer}>
      {(() => {
        if (chatClicked) {
          return (
            <ChirpChat id={chatId} name={chatName} onBackPress={backToGroups} />
          );
        } else if (createClicked) {
          return <CreateChat onBackPress={backToGroups} />;
        } else {
          return (
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <SearchBar onChange={setSearch}></SearchBar>
                <CreateButton onPress={goToCreateChat}></CreateButton>
              </View>
              <ScrollView style={styles.groupsScroll}>
                {chatGroups && chatGroups.length > 0 ? (
                  chatGroups.map((grp) => (
                    <ChatPreview
                      key={grp.chatId}
                      chatName={grp.name}
                      previewText={grp.lastMessage ? grp.lastMessage : ""}
                      previewtimestamp={
                        grp.lastMessageTimestamp
                          ? grp.lastMessageTimestamp.seconds
                          : ""
                      }
                      notOpened={grp.membersUnseen.includes(email)}
                      onPress={() => goToChat(grp.chatId, grp.name)}
                    />
                  ))
                ) : (
                  <Text style={styles.emptyGroupsText}>
                    You have not joined any chats yet. {"\n\n"}Click the create
                    button to make your own chat group!
                  </Text>
                )}
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
  emptyGroupsText: {
    fontSize: theme.dimensions.standardFontSize + 5,
    color: theme.colors.hazeText,
    width: "80%",
    alignSelf: "center",
    paddingTop: 40,
    textAlign: "center",
  },
});
