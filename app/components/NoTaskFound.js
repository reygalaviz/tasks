import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../constants/constants";

function NoTaskFound({ search }) {
  return (
    <View style={styles.noTaskContainer}>
      <Text style={styles.noTaskText}>"{search}"</Text>
      <Text style={[styles.noTaskSubText]}>Not Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noTaskContainer: {
    height: constants.noTasksHeight,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: constants.m,
  },
  noTaskText: {
    fontWeight: "bold",
    fontSize: constants.noTaskFontSize,
    textAlign: "center",
  },
  noTaskSubText: {
    fontWeight: "500",
    fontSize: constants.noTaskSubFontSize,
    textAlign: "center",
    marginTop: constants.s,
  },
});

export default NoTaskFound;
