import React, { useState, useRef, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import Filters from "./Filters";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";

function TasksTypeFilter({
  setSelectedTab,
  filterModal,
  filterSheetRef,
  filterTab,
  setFilterTab,
}) {
  const theme = useContext(themeContext);

  const section = [
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
    { id: "done", label: "Completed" },
  ];

  const handleFilterClick = () => {
    if (filterTab === 0) {
      setSelectedTab("Today");
    }
    if (filterTab === 1) {
      setSelectedTab("Upcoming");
    }
    if (filterTab === 2) {
      setSelectedTab("Completed");
    }
    filterSheetRef.current.close();
  };
  return (
    <Filters
      rbSheetRef={filterSheetRef}
      title="Filters"
      height={400}
      donePressed={() => handleFilterClick()}
      resetPressed={() => setFilterTab([])}
    >
      {section.map(({ id, label }, index) => {
        const isActive = index == filterTab;
        return (
          <View key={id} style={styles.rowWrapper}>
            <TouchableOpacity onPress={() => setFilterTab(index)}>
              <View
                style={[
                  styles.row,
                  isActive && { backgroundColor: theme.color },
                ]}
              >
                <Text
                  style={[
                    styles.rowLabel,
                    isActive && { color: theme.background },
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

export default TasksTypeFilter;
