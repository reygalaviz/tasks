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
import { useDeviceTheme } from "../theme/deviceTheme";
function TasksPriorityFilter({
  priorityPicked,
  setPriorityPicked,
  pSheetRef,
  filterNotes,
  setActivePTab,
}) {
  const theme = useDeviceTheme();

  const section = [
    { id: "high", label: "High" },
    { id: "medium", label: "Medium" },
    { id: "low", label: "Low" },
  ];

  const handlePriorityPicked = (p) => {
    const newPriorities = priorityPicked.includes(p)
      ? priorityPicked.filter((c) => c !== p)
      : [...priorityPicked, p];
    setPriorityPicked(newPriorities);
  };

  const handleSubmit = () => {
    filterNotes();
    if (priorityPicked.length !== 0) {
      setActivePTab(true);
    } else {
      setActivePTab(false);
    }
    pSheetRef.current.close();
  };
  const handleReset = () => {
    setActivePTab(false);
    setPriorityPicked([]);
  };

  return (
    <Filters
      rbSheetRef={pSheetRef}
      title="Filters"
      height={400}
      donePressed={() => handleSubmit()}
      resetPressed={() => handleReset()}
      disabled={priorityPicked.length === 0 ? true : false}
      opacity={priorityPicked.length === 0 ? 0.5 : 1}
    >
      {section.map(({ id, label }, index) => {
        return (
          <View key={id} style={styles.rowWrapper}>
            <TouchableOpacity onPress={() => handlePriorityPicked(label)}>
              <View
                style={[
                  styles.row,
                  priorityPicked.includes(label)
                    ? { backgroundColor: theme.filterActiveButton }
                    : { backgroundColor: theme.filterInActiveButton },
                ]}
              >
                <Text
                  style={[
                    styles.rowLabel,
                    {
                      color: priorityPicked.includes(label)
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
