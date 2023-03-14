import React, { useRef, useState, useCallback, useContext } from "react";
import { View, Pressable, StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getTheme } from "../theme/theme";

function DeleteButton({ onPress }) {
  const theme = getTheme(useColorScheme());
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
