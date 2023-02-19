import React, { useRef, useState, useCallback } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SettingsButton({ onOpenSettings }) {
  return (
    <Pressable style={styles.container} onPress={onOpenSettings}>
      <Ionicons name="settings-outline" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SettingsButton;
