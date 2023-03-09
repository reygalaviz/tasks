import React, { useRef, useState, useCallback, useContext } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import themeContext from "../theme/themeContext";

function AddTaskButton({ onOpenAddTask }) {
  const theme = useContext(themeContext);
  return (
    <Pressable
      style={[styles.container, { backgroundColor: "#2E5077" }]}
      onPress={onOpenAddTask}
    >
      <Ionicons name="add" size={35} color="white" />
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
