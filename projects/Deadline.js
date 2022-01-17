import React, { useState } from "react";
import { StyleSheet, Text, Button, View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { theme } from "../assets/Theme";
import CreateButton from "../components/CreateButton";
import ChirpButton from "../components/ChirpButton";

import firebase from "firebase/app";
import "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import app from "../config/FirebaseConfig";
import FormatTime from "../functions/FormatTime";

const firestore = firebase.firestore(app);

export default function Deadline({ currentDeadline, projectId }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  var deadlineDate = FormatTime(currentDeadline, "date");
  var deadlineTime = FormatTime(currentDeadline, "time");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (selectedDate) {
      setDeadlineDate(currentDate);
    }
  };

  function setDeadlineDate(currentDate) {
    const projectRef = firestore.collection("projects").doc(projectId);
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
    borderTopColor: theme.colors.jet,
    borderTopWidth: 1,
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
