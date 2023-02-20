import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";

function HeaderBar({ children }) {
  const theme = useContext(themeContext);
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <Text style={[styles.appName, { color: theme.color }]}>reminder</Text>
      </View>
      <View style={[styles.layout, styles.right]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: constants.m,
    marginTop: constants.marginTopHeader,
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

export default HeaderBar;
