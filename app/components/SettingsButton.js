import React, { useRef, useState, useCallback, useContext } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import themeContext from "../theme/themeContext";

function SettingsButton({ onOpenSettings }) {
  const theme = useContext(themeContext);
  return (
    <Pressable style={styles.container} onPress={onOpenSettings}>
      <Ionicons name="settings-outline" size={24} color={theme.color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SettingsButton;
