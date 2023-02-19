import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import constants from "../constants/constants";

function TabBar({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Text style={styles.appName}>reminder</Text>
      </View>
      <View style={[styles.layout, styles.right]}>{children}</View>
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
