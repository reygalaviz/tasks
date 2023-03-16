import React, { useState, useRef, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Filters from "./Filters";
import constants from "../constants/constants";
import { getTheme } from "../theme/theme";
function TasksPriorityFilter({
  priorityPicked,
  setPriorityPicked,
  pSheetRef,
  filterNotes,
  setActivePTab,
}) {
  const theme = getTheme(useColorScheme());

  const section = [
    { id: "high", label: "High" },
    { id: "medium", label: "Medium" },
    { id: "low", label: "Low" },
  ];

  const handleSubmit = () => {
    filterNotes();
    if (priorityPicked) {
      setActivePTab(true);
    }
    pSheetRef.current.close();
  };
  const handleReset = () => {
    setActivePTab(false);
    setPriorityPicked();
  };

  return (
    <Filters
      rbSheetRef={pSheetRef}
      title="Filters"
      height={400}
      donePressed={() => handleSubmit()}
      resetPressed={() => handleReset()}
      disabled={!priorityPicked ? true : false}
      opacity={!priorityPicked ? 0.5 : 1}
    >
      {section.map(({ id, label }, index) => {
        return (
          <View key={id} style={styles.rowWrapper}>
            <TouchableOpacity onPress={() => setPriorityPicked(label)}>
              <View
                style={[
                  styles.row,
                  priorityPicked === "High" && label === priorityPicked
                    ? { backgroundColor: theme.color }
                    : null,
                  priorityPicked === "Medium" && label === priorityPicked
                    ? { backgroundColor: theme.color }
                    : null,
                  priorityPicked === "Low" && label === priorityPicked
                    ? { backgroundColor: theme.color }
                    : null,
                ]}
              >
                <Text
                  style={[
                    styles.rowLabel,
                    {
                      color:
                        label === priorityPicked
                          ? theme.background
                          : theme.color,
                    },
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

export default TasksPriorityFilter;
