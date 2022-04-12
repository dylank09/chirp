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
  // we use useStates so that whenever a state (e.g. email) changes, the componenent re-renders
  const [chatClicked, setChatClicked] = useState(false);
  const [createClicked, setCreateClicked] = useState(false);
  const [chatId, setChatId] = useState();
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");

  //get the current user information as an object from the firebase auth package
  const currentUser = auth.currentUser;
  var email = "";

  if (currentUser) {
    email = currentUser.email;
  }

  // make a reference to the chatGroups firestore collection
  const chatsRef = firestore.collection("chatGroups");
  // make a query on the ref for chats where the members array contains current user's email address
  const query = chatsRef.where("members", "array-contains", email);
  // now get the groups that the query returns
  // useCollectionData is a hook that imitates a real-time database set up
  // each time the underlying data changes in the database, the groups object will be updated
  // and the component will re-render as a result
  const [groups] = useCollectionData(query, { idField: "chatId" });

  let chatGroups;

  // here we sort the groups based on the last message timestamp field that exists in each chat document
  // the group with the most recent message will be first
  if (groups) {
    groups.sort(function (a, b) {
      return b.lastMessageTimestamp - a.lastMessageTimestamp;
    });
    chatGroups = groups;
  }

  // this function changes state values so that instead of the groups being returned
  // a single chat is returned. The chat id is set also so the "ChirpChat.js" component
  // knows which chat information to retrieve from the firestore database
  function goToChat(id, name) {
    setChatId(id);
    setChatClicked(true);
    setChatName(name);

    // this function sets the chat (given by "id") as "read" by the current user. See below
    setChatOpenedByUser(id);
  }

  // setting "createClicked" to true will make the conditional statement below return the create screen
  function goToCreateChat() {
    setCreateClicked(true);
  }

  // function that clears the states so that groups are shown again
  function backToGroups() {
    setChatClicked(false);
    setCreateClicked(false);
    setChatId(0);
  }

  // helper function to remove a given element from an array
  function removeElementFromArray(element, array) {
    const index = array.indexOf(element);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return array;
  }

  function setChatOpenedByUser(id) {
    var groupIndex = -1;
    // for loop to find the chat by ID
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].chatId == id) {
        groupIndex = i;
        break;
      }
    }
    if (groupIndex == -1) {
      return false;
    }

    // get the array from groups of members that havent opened the chat since a message was sent in
    let unseen = groups[groupIndex].membersUnseen;
    // use helper method to remove the user from this list
    let updateUnseen = removeElementFromArray(email, unseen);

    // update the document (given by ID) with the new array (without the current user's email)
    chatsRef.doc(id).update({
      membersUnseen: updateUnseen,
    });
    return true;
  }

  // here we deal with the search feature.
  if (search.length > 0) {
    // if there is 1 or more characters in the search field
    // filter the groups using our custom filter function
    const matches = groups.filter((group) => {
      // for each group, if its name in lowercase contains the search term at any stage...
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
                  <Text style={styles.emptyGroupsText} testID="noChatsHelpText">
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
