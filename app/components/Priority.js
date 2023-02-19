import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import constants from "../constants/constants";

function Priority({ fgColor, priorityTitle }) {
  var bgColor;

  if (priorityTitle === "High") {
    bgColor = "#F76C5E";
  } else if (priorityTitle === "Medium") {
    bgColor = "#FFA552";
  } else {
    bgColor = "#B6EEA6";
  }
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, fgColor ? { color: fgColor } : {}]}>
        {priorityTitle}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    paddingHorizontal: constants.s,
    paddingVertical: constants.xs,
  },
  text: {
    fontSize: constants.cardPriority,
  },
});

export default Priority;
