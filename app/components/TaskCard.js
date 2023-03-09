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

function TaskCard({
  task,
  onPress,
  children,
  style,
  styleContainer,
  selected,
}) {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  // const completedTasks = Object.values(task).filter(
  //   (task) => task.completed
  // ).length;
  // const remainingTasks = Object.values(task).length - completedTasks;

  return (
    <Pressable
      onPress={onPress}
      style={[, styles.taskContainer, styleContainer]}
    >
      <View
        style={[
          styles.task,
          style,
          { backgroundColor: task.color, borderColor: "#333333" },
        ]}
      >
        {children}

        {selected && <View style={styles.overlay} />}
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
    // overflow: "hidden",
  },
  task: {
    height: constants.cardHeight,
    width: "90%",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: constants.m,
    paddingVertical: constants.s,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 0,
    left: 0,
  },
});

export default TaskCard;
