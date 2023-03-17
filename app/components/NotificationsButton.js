import React, { useRef, useState, useCallback, useContext } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";

function NotificationsButton({ onOpenNotifications }) {
  const theme = useDeviceTheme();

  return (
    <Pressable
      onPress={onOpenNotifications}
      style={{ paddingRight: constants.m }}
    >
      <Ionicons name="notifications-outline" size={24} color={theme.color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NotificationsButton;
