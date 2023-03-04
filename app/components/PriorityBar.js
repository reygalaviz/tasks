import React, { useState, useContext } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";

function PriorityBar({ priority, setPriority, buttons }) {
  const theme = useContext(themeContext);

  const handleClick = (item, label) => {
    setPriority(label);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.headerText, { color: theme.color }]}>
          Priority
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((buttonLabel) => {
          return (
            <Pressable
              onPress={(item) => handleClick(item, buttonLabel)}
              key={buttonLabel}
              style={[
                buttonLabel === priority
                  ? [styles.buttonActive, { backgroundColor: theme.color }]
                  : styles.button,
                buttonLabel === "High"
                  ? { borderRightWidth: 0, borderColor: theme.textBorder }
                  : null,
                buttonLabel === "Medium"
                  ? { borderRightWidth: 0, borderColor: theme.textBorder }
                  : null,
                buttonLabel === "High"
                  ? { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }
                  : null,
                buttonLabel === "Low"
                  ? {
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      borderColor: theme.textBorder,
                    }
                  : null,
              ]}
            >
              <Text
                style={[
                  buttonLabel === priority
                    ? [styles.textActive, { color: theme.active }]
                    : [styles.text, { color: theme.color }],
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
    fontWeight: "600",
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
  // text: {
  //   color: "black",
  // },
  // textActive: {
  //   color: "white",
  // },
});

export default PriorityBar;
