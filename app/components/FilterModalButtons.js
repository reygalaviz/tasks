import React, { useContext } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";

function FilterModalButtons({ resetPressed, donePressed, disabled, opacity }) {
  const theme = useDeviceTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disabled}
        onPress={resetPressed}
        style={[styles.resetButton, { opacity: opacity }]}
      >
        <Text style={[styles.text, { color: theme.color }]}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={donePressed} style={styles.doneButton}>
        <Text style={[styles.text, { color: theme.background }]}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: constants.m,
    flexDirection: "row",
    marginBottom: "9%",
    left: 0,
    right: 0,
    position: "sticky",
    bottom: 0,
    alignItems: "center",
  },
  resetButton: {
    borderColor: "#DCDCDC",
    borderWidth: 2,
    height: constants.filterButtonsHeight,
    width: "45%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButton: {
    backgroundColor: "#DD6E42",
    height: constants.filterButtonsHeight,
    width: "45%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default FilterModalButtons;
