import React, { useRef, useState, useCallback, useContext } from "react";
import { View, Pressable, StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDeviceTheme } from "../theme/deviceTheme";

function DeleteButton({ onPress }) {
  const theme = useDeviceTheme();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name="trash-outline" size={24} color={theme.color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DeleteButton;
