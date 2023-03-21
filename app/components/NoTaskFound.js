import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../constants/constants";

function NoTaskFound({ message }) {
  return (
    <View
      style={{
        flexGrow: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: constants.flatListPaddingTop + 150,
      }}
    >
      <Text
        style={{
          fontSize: constants.sectionHeader,
          fontWeight: "700",
          color: "#a7a7a7",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default NoTaskFound;
