import React, { useState, useRef, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import Filters from "./Filters";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";
function TasksColorFilter({
  colorSheetRef,
  tasks,
  setTasks,
  colorsPicked,
  setColorsPicked,
  filterNotes,
  setActiveColorTab,
}) {
  const theme = useDeviceTheme();

  const colorFilter = [
    { id: 1, label: "red", color: "#586BA4" },
    { id: 2, label: "blue", color: "#F5DD90" },
    { id: 3, label: "orange", color: "#84DCCF" },
    { id: 4, label: "purple", color: "#C5EBC3" },
    { id: 5, label: "brown", color: "#799496" },
    { id: 6, label: "teal", color: "#F0EFF4" },
    { id: 7, label: "black", color: "#F79AD3" },
    { id: 8, label: "gray", color: "#92B9BD" },
    { id: 9, label: "pink", color: "#D9DBF1" },
    { id: 10, label: "green", color: "#C0FDFB" },
    { id: 11, label: "lightgreen", color: "#BE95C4" },
    { id: 12, label: "violet", color: "#DAD4EF" },
    { id: 13, label: "lightgray", color: "#ECBEB4" },
    { id: 14, label: "lightblue", color: "#EBCFB2" },
  ];

  const handleColorChange = (color) => {
    const newSelectedColors = colorsPicked.includes(color)
      ? colorsPicked.filter((c) => c !== color)
      : [...colorsPicked, color];
    setColorsPicked(newSelectedColors);
  };

  const handleSubmit = () => {
    filterNotes();
    if (colorsPicked.length !== 0) {
      setActiveColorTab(true);
    }
    colorSheetRef.current.close();
  };

  const handleReset = () => {
    setActiveColorTab(false);
    setColorsPicked([]);
  };

  return (
    <Filters
      rbSheetRef={colorSheetRef}
      title="Colors"
      height={constants.filterModalHeight}
      donePressed={() => handleSubmit()}
      resetPressed={() => handleReset()}
      disabled={colorsPicked.length === 0 ? true : false}
      opacity={colorsPicked.length === 0 ? 0.5 : 1}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginBottom: 10 }}
      >
        {colorFilter.map(({ id, label, color }, index) => {
          return (
            <View key={id} style={styles.rowWrapper}>
              <TouchableOpacity onPress={() => handleColorChange(color)}>
                <View
                  style={[
                    styles.row,
                    colorsPicked.includes(color)
                      ? { backgroundColor: theme.filterActiveButton }
                      : { backgroundColor: theme.filterInActiveButton },
                    ,
                  ]}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 100,
                      borderWidth: 1,
                      backgroundColor: color,
                      borderColor: color,
                      marginRight: constants.s,
                    }}
                  />
                  <Text
                    style={[
                      styles.rowLabel,
                      colorsPicked.includes(color)
                        ? { color: theme.background }
                        : { color: theme.color },
                    ]}
                  >
                    {label}
                  </Text>
                  <View style={styles.rowSpacer} />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </Filters>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    marginBottom: constants.s,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: constants.m,
    paddingVertical: constants.m,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
  },
  rowLabel: {
    fontSize: constants.sectionItem,
    fontWeight: "700",
  },
  rowSpacer: {
    flex: 1,
  },
  selectedActive: {
    backgroundColor: "black",
  },
});

export default TasksColorFilter;
