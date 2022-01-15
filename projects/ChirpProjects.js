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
import ChirpProject from "./ChirpProject";
import CreateProject from "./CreateProject";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function ChirpProjects() {
  const [projectClicked, setProjectClicked] = useState(false);
  const [createClicked, setCreateClicked] = useState(false);
  const [projectID, setProjectID] = useState("");
  const [projectName, setProjectName] = useState("");
  const [currentProject, setCurrentProject] = useState();

  const uid = auth.currentUser.uid;
  const projectsRef = firestore.collection("projects");
  const query = projectsRef.where("members", "array-contains", uid);
  const [projects] = useCollectionData(query, { idField: "projectId" });

  console.log(projects);

  function goToProject(id, name) {
    setProjectID(id);
    setProjectClicked(true);
    setProjectName(name);
    projects.forEach((proj) => {
      if (proj.projectId === id) {
        setCurrentProject(proj);
      }
    });
  }

  function goToCreateProject() {
    setCreateClicked(true);
  }

  function backToList() {
    setProjectClicked(false);
    setCreateClicked(false);
    setProjectID(0);
  }

  return (
    <View style={styles.outerContainer}>
      {(() => {
        if (projectClicked) {
          return (
            <ChirpProject
              id={projectID}
              name={projectName}
              onBackPress={backToList}
              projectData={currentProject}
            />
          );
        } else if (createClicked) {
          return <CreateProject onBackPress={backToList}></CreateProject>;
        } else {
          return (
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Projects</Text>
              </View>
              <ScrollView style={styles.projectScroll}>
                {projects && projects.length > 0 ? (
                  projects.map((proj) => (
                    <ProjectPreview
                      key={proj.projectId}
                      projectName={proj.name}
                      nextTodo={proj.nextTodo ? proj.nextTodo : ""}
                      remaining={"21 days, 6 hours"}
                      onPress={() => goToProject(proj.projectId, proj.name)}
                    />
                  ))
                ) : (
                  <Text style={styles.emptyGroupsText}>
                    You have not joined any projects yet. {"\n\n"}Click the
                    create button to make your own!
                  </Text>
                )}
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
  emptyGroupsText: {
    fontSize: theme.dimensions.standardFontSize + 4,
    color: theme.colors.hazeText,
    width: "85%",
    alignSelf: "center",
    paddingTop: 40,
    textAlign: "center",
  },
});
