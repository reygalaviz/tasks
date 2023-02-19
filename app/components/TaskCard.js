import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import constants from "../constants/constants";
import { MaterialIcons } from "@expo/vector-icons";
import Checkmark from "./Checkmark";
import Priority from "./Priority";

function TaskCard({ task }) {
  const completedTasks = Object.values(task).filter(
    (task) => task.completed
  ).length;

  const remainingTasks = Object.values(task).length - completedTasks;

  return (
    <Pressable style={[styles.container, { backgroundColor: task.color }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {task.name}
        </Text>
        <Checkmark />
      </View>

      <View>
        <View style={styles.dateContainer}>
          <MaterialIcons name="calendar-today" size={18} color="black" />
          <Text style={styles.date}></Text>
        </View>
        <View style={styles.timeContainer}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="access-time" size={18} color="black" />
            <Text style={styles.date}></Text>
          </View>
          <Priority priorityTitle={task.priority} />
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 130,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    paddingVertical: constants.s,
    paddingHorizontal: constants.m,
    marginVertical: constants.xs,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  title: {
    fontSize: constants.cardTitle,
    fontWeight: "bold",
    width: "70%",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: constants.cardDate,
    fontWeight: "normal",
    marginLeft: constants.s,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: constants.xs - 2,
    justifyContent: "space-between",
  },
});

export default TaskCard;
