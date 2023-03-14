import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function AddTaskButton({ onOpenAddTask }) {
  return (
    <Pressable
      style={[styles.container, { backgroundColor: "#DD6E42" }]}
      onPress={onOpenAddTask}
    >
      <Ionicons name="add" size={30} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "90%",
    left: "81%",
    height: 50,
    width: 50,
    zIndex: 50,
  },
});

export default AddTaskButton;
