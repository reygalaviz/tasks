import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import constants from "../constants/constants";

function PriorityBar({ priority, setPriority, buttons }) {
  const handleClick = (item, label) => {
    setPriority(label);
    console.log(label);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Priority</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((buttonLabel) => {
          return (
            <Pressable
              onPress={(item) => handleClick(item, buttonLabel)}
              key={buttonLabel}
              style={[
                buttonLabel === priority ? styles.buttonActive : styles.button,
                buttonLabel === "High" ? { borderRightWidth: 0 } : null,
                buttonLabel === "Medium" ? { borderRightWidth: 0 } : null,
                buttonLabel === "High"
                  ? { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }
                  : null,
                buttonLabel === "Low"
                  ? { borderTopRightRadius: 10, borderBottomRightRadius: 10 }
                  : null,
              ]}
            >
              <Text
                style={[
                  buttonLabel === priority ? styles.textActive : styles.text,
                ]}
              >
                {buttonLabel}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: constants.s,
  },
  headerText: {
    fontSize: constants.sectionHeader,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    color: "black",
  },
  textActive: {
    color: "white",
  },
});

export default PriorityBar;
