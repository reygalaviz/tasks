import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../constants/constants";
import Priority from "./Priority";

function TaskItem({ task }) {
  return (
    <View style={[styles.container, { backgroundColor: task.color }]}>
      <Text>{console.log(task.name)}</Text>
      <Text>{task.name}</Text>
      <Text>{console.log(task.priority)}</Text>
      <Priority priorityTitle={task.priority} />
    </View>
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
});

export default TaskItem;
