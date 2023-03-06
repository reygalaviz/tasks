import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import constants from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";

function ModalSheetHeader({ title, onPress, style, iconColor, cancel, done }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, style]}>{title}</Text>
      <Pressable onPress={onPress}>
        {cancel && <Ionicons name="close" size={24} color={iconColor} />}
        {done && <Text>Done</Text>}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: constants.m,
    marginTop: constants.sheetTopPadding,
    marginBottom: constants.l,
  },
  headerText: {
    fontSize: constants.screenHeader,
    fontWeight: "bold",
  },
});

export default ModalSheetHeader;
