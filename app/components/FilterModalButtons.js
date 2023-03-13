import React, { useContext } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";

function FilterModalButtons({ resetPressed, donePressed }) {
  const theme = useContext(themeContext);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={resetPressed}
        style={[styles.resetButton, { backgroundColor: theme.background }]}
      >
        <Text style={styles.text}>Reset</Text>
      </Pressable>
      <Pressable onPress={donePressed} style={styles.doneButton}>
        <Text style={[styles.text, { color: theme.background }]}>Done</Text>
      </Pressable>
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