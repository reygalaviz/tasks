import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../constants/constants";

function NoTaskFound({ search }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: constants.sectionHeader,
          fontWeight: "700",
          color: "#a7a7a7",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        no tasks for today
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default NoTaskFound;
