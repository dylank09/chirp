import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { theme } from "../assets/Theme";
import app from "../config/FirebaseConfig";
import CreateButton from "../components/CreateButton";
import ProjectPreview from "./ProjectPreview";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function ChirpProjects() {
  const [projectClicked, setProjectClicked] = useState(false);
  const [createClicked, setCreateClicked] = useState(false);
  const [projectID, setProjectID] = useState();
  const [projectName, setProjectName] = useState("");

  const uid = auth.currentUser.uid;
  const chatsRef = firestore.collection("chatGroups");
  const query = chatsRef.where("members", "array-contains", uid);
  const [groups] = useCollectionData(query, { idField: "chatId" });

  function goToProject(id, name) {
    setProjectID(id);
    setProjectClicked(true);
    setProjectName(name);
  }

  function goToCreateProject() {
    setCreateClicked(true);
  }

  function backToGroups() {
    setProjectClicked(false);
    setCreateClicked(false);
    setProjectID(0);
  }

  return (
    <View style={styles.outerContainer}>
      {(() => {
        if (projectClicked) {
          return (
            <ChirpChat
              id={projectID}
              name={projectName}
              onBackPress={backToGroups}
            />
          );
        } else if (createClicked) {
          return;
        } else {
          return (
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Projects</Text>
              </View>
              <ScrollView style={styles.projectScroll}>
                <ProjectPreview
                  projectName="Mobile App"
                  nextTodo="Fix bug"
                  remaining="21 days"
                ></ProjectPreview>
              </ScrollView>
              <View style={styles.footer}>
                <CreateButton onPress={goToCreateProject}></CreateButton>
              </View>
            </SafeAreaView>
          );
        }
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    marginTop: 15,
    alignItems: "center",
    marginBottom: 40,
  },
  headerText: {
    color: theme.colors.text,
    fontWeight: "500",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
  projectScroll: {
    flex: 1,
  },
  footer: {
    alignItems: "flex-end",
    margin: 15,
  },
});
