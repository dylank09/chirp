import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { theme } from "../assets/Theme";
import ChirpButton from "../components/ChirpButton";
import FormatTime from "../functions/FormatTime";

import { useDocumentData } from "react-firebase-hooks/firestore";

import firestore from "../config/FirestoreInit";

export default function Deadline({ projectId }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const projectRef = firestore.collection("projects").doc(projectId);
  const [project] = useDocumentData(projectRef);

  if (project) {
    var deadlineDate = FormatTime(project.deadline.seconds, "date");
    var deadlineTime = FormatTime(project.deadline.seconds, "time");
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (selectedDate) {
      setDeadlineDate(currentDate);
    }
  };

  function setDeadlineDate(currentDate) {
    projectRef.update({
      deadline: firebase.firestore.Timestamp.fromDate(currentDate),
    });
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Deadline</Text>
      <View style={styles.body}>
        <Text style={styles.deadline} onPress={showDatepicker}>
          {deadlineDate}
          {" at "}
          {deadlineTime}
        </Text>
        <View style={styles.buttons}>
          <ChirpButton width="38%" text="Edit date" onPress={showDatepicker} />
          <ChirpButton width="38%" text="Edit time" onPress={showTimepicker} />
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "space-around",
    maxHeight: "20%",
    width: "100%",
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
  deadline: {
    color: theme.colors.primary,
    fontSize: theme.dimensions.standardFontSize + 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
