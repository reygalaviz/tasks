import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  useColorScheme,
} from "react-native";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";

function PriorityBar({ priority, setPriority, buttons }) {
  const theme = useDeviceTheme();

  const handleClick = (item, label) => {
    setPriority(label);
  };
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: constants.m,
        marginVertical: constants.s,
      }}
    >
      {buttons.map((buttonLabel) => {
        return (
          <Pressable
            onPress={(item) => handleClick(item, buttonLabel)}
            key={buttonLabel}
            style={[
              buttonLabel === "High" && buttonLabel === priority
                ? [styles.activeTab, { backgroundColor: "#F76C5E" }]
                : null,
              buttonLabel === "Medium" && buttonLabel === priority
                ? [styles.activeTab, { backgroundColor: "#FFA552" }]
                : null,
              buttonLabel === "Low" && buttonLabel === priority
                ? [styles.activeTab, { backgroundColor: "#B6EEA6" }]
                : null,
              styles.container,
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: buttonLabel === priority ? "black" : theme.color,
                },
              ]}
            >
              {buttonLabel}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: constants.s,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: constants.tabWidth,
    height: constants.tabHeight,
  },
  text: {
    fontWeight: "700",
    fontSize: constants.tabText,
  },
  activeTab: {},
});

export default PriorityBar;
