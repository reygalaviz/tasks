import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";
import { useNavigation } from "@react-navigation/native";

function TaskCard({ task, onPress, children, style, styleContainer }) {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const completedTasks = Object.values(task).filter(
    (task) => task.completed
  ).length;
  const remainingTasks = Object.values(task).length - completedTasks;

  return (
    <Pressable
      onPress={onPress}
      style={[, styles.taskContainer, styleContainer]}
    >
      <View style={[styles.task, style, { backgroundColor: task.color }]}>
        {children}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: constants.s,
    height: constants.cardHeight,
  },
  task: {
    height: constants.cardHeight,
    width: "90%",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: constants.s,
    paddingHorizontal: constants.m,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default TaskCard;
