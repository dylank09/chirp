import React, { useState } from "react";
import { StyleSheet, Text, Button, View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { theme } from "../assets/Theme";
import CreateButton from "../components/CreateButton";

import firebase from "firebase/app";
import "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import app from "../config/FirebaseConfig";
import FormatTime from "../functions/FormatTime";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function Deadline({ currentDeadline }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  console.log(date);

  var deadlineDate = FormatTime(currentDeadline, "date");
  var deadlineTime = FormatTime(currentDeadline, "time");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

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
      <View style={styles.deadline}>
        <Text style={styles.deadlineDate} onPress={showDatepicker}>
          {deadlineDate}
        </Text>
        <Text style={styles.deadlineTime} onPress={showTimepicker}>
          {deadlineTime}
        </Text>
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
    flexDirection: "row",
    // width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: theme.colors.jet,
    borderTopWidth: 1,
  },
});
