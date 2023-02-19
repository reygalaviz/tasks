import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import constants from "../constants/constants";

const circle_size = 40;
const circle_ringsize = 2;

function ColorBar({ color, setColor }) {
  const cardColors = [
    "#586BA4",
    "#F5DD90",
    "#84DCCF",
    "#C5EBC3",
    "#799496",
    "#F0EFF4",
    "#F79AD3",
  ];

  return (
    <View style={styles.group}>
      {cardColors.map((value) => {
        const isActive = color === value;
        return (
          <View key={value}>
            <TouchableWithoutFeedback onPress={() => setColor(value)}>
              <View
                style={[styles.circle, isActive && { borderColor: "black" }]}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: constants.s,
  },
  circle: {
    width: circle_size + circle_ringsize * 4,
    height: circle_size + circle_ringsize * 4,
    borderRadius: 100,
    marginRight: 5,

    borderWidth: circle_ringsize,
    borderColor: "transparent",
  },
  circleInside: {
    width: circle_size,
    height: circle_size,
    borderRadius: 100,
    position: "absolute",
    top: circle_ringsize,
    left: circle_ringsize,
  },
});

export default ColorBar;
