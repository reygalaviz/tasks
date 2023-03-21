import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";

function ColorBar({ color, setColor }) {
  const theme = useDeviceTheme();

  const cardColors = [
    "#fbf8cc",
    "#fde4cf",
    "#ffcfd2",
    "#f1c0e8",
    "#cfbaf0",
    "#a3c4f3",
    "#90dbf4",
    "#8eecf5",
    "#98f5e1",
    "#b9fbc0",
    "#BE95C4",
    "#DAD4EF",
    "#ECBEB4",
    "#EBCFB2",
  ];

  return (
    <View style={styles.group}>
      {cardColors.map((value) => {
        const isActive = color === value;
        return (
          <View key={value}>
            <TouchableWithoutFeedback onPress={() => setColor(value)}>
              <View
                style={[
                  styles.circle,
                  isActive && {
                    borderColor: theme.color,
                  },
                ]}
              >
                <View
                  style={[styles.circleInside, { backgroundColor: value }]}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: constants.m,
  },
  circle: {
    width: constants.circleSize + constants.circleRing * 4,
    height: constants.circleSize + constants.circleRing * 4,
    borderRadius: 100,
    marginRight: constants.spaceBetween,
    marginBottom: constants.s,
    borderWidth: constants.circleRing,
    borderColor: "transparent",
  },
  circleInside: {
    width: constants.circleSize,
    height: constants.circleSize,
    borderRadius: 100,
    position: "absolute",
    top: constants.circleRing,
    left: constants.circleRing,
  },
});

export default ColorBar;
