import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";

const circle_size = 40;
const circle_ringsize = 2;

function ColorBar({ color, setColor }) {
  const theme = useContext(themeContext);

  const cardColors = [
    "#586BA4",
    "#F5DD90",
    "#84DCCF",
    "#C5EBC3",
    "#799496",
    "#F0EFF4",
    "#F79AD3",
    "#92B9BD",
    "#D9DBF1",
    "#C0FDFB",
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
    width: circle_size + circle_ringsize * 4,
    height: circle_size + circle_ringsize * 4,
    borderRadius: 100,
    marginRight: 2,
    marginBottom: constants.s,
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
