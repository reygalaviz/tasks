import React, { useRef, useState, useCallback } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants/constants";

function NotificationsButton({ onOpenNotifications }) {
  return (
    <Pressable
      onPress={onOpenNotifications}
      style={{ paddingRight: constants.m }}
    >
      <Ionicons name="notifications-outline" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NotificationsButton;
