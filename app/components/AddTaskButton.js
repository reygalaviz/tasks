import React, { useRef, useState, useCallback } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function AddTaskButton({ onOpenAddTask }) {
  return (
    <Pressable style={styles.container} onPress={onOpenAddTask}>
      <Ionicons name="add" size={24} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    top: "90%",
    left: "90%",
    height: 50,
    width: 50,
    zIndex: 50,
  },
});

export default AddTaskButton;
