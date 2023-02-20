import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import constants from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";

function ModalSheetHeader({ title, onPress, style, iconColor }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, style]}>{title}</Text>
      <Pressable onPress={onPress}>
        <Ionicons name="close" size={24} color={iconColor} />
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
    marginBottom: constants.l,
  },
  headerText: {
    fontSize: constants.screenHeader,
    fontWeight: "bold",
  },
});

export default ModalSheetHeader;
