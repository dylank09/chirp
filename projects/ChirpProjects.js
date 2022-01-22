import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";

import { theme } from "../assets/Theme";
import CreateButton from "../components/CreateButton";
import ProjectPreview from "./ProjectPreview";
import ChirpProject from "./ChirpProject";
import CreateProject from "./CreateProject";
import GetRemaining from "../functions/GetRemaining";

import { useCollectionData } from "react-firebase-hooks/firestore";

import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";

export default function ChirpProjects(props) {
  const [projectClicked, setProjectClicked] = useState(false);
  const [createClicked, setCreateClicked] = useState(false);
  const [projectID, setProjectID] = useState("");
  const [projectName, setProjectName] = useState("");

  const { email } = auth.currentUser;
  const projectsRef = firestore.collection("projects");
  const query = projectsRef.where("members", "array-contains", email);
  const [projects] = useCollectionData(query, { idField: "projectId" });

  if (projects) {
    projects.sort(function (a, b) {
      var x = a.deadline ? a.deadline.seconds : 0;
      var y = b.deadline ? b.deadline.seconds : 0;
      return x - y;
    });
  }

  function goToProject(id, name) {
    setProjectID(id);
    setProjectClicked(true);
    setProjectName(name);
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
              name={projectName}
              onBackPress={backToList}
              projectId={projectID}
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
                      remaining={GetRemaining(proj.deadline)}
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
    marginBottom: 50,
  },
  headerText: {
    color: theme.colors.text,
    fontWeight: "bold",
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
