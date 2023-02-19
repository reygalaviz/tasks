import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants/constants";

function TabBar(props) {
  const onSettingsPress = () => {
    console.warn("settings");
  };
  const onNotificationPress = () => {
    console.warn("notifications");
  };
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Text style={styles.appName}>reminder</Text>
      </View>
      <View style={[styles.layout, styles.right]}>
        <Pressable
          onPress={onNotificationPress}
          style={{ paddingRight: constants.m }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
        </Pressable>

        <Pressable onPress={onSettingsPress}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: constants.HEADER_HEIGHT,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  layout: {
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
  },
  appName: {
    fontSize: constants.header,
  },
  right: { justifyContent: "flex-end" },
});

export default TabBar;
