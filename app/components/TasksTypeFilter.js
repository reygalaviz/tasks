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
function TasksTypeFilter({
  setSelectedTab,
  filterModal,
  filterSheetRef,
  filterTab,
  setFilterTab,
}) {
  const theme = useDeviceTheme();

  const section = [
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
    { id: "done", label: "Completed" },
  ];

  const handleFilterClick = () => {
    if (filterTab === "Today") {
      setSelectedTab("Today");
    }
    if (filterTab === "Upcoming") {
      setSelectedTab("Upcoming");
    }
    if (filterTab === "Completed") {
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
      resetPressed={() => setFilterTab("Today")}
      disabled={filterTab === "Today" ? true : false}
      opacity={filterTab === "Today" ? 0.5 : 1}
    >
      {section.map(({ id, label }) => {
        return (
          <View key={id} style={styles.rowWrapper}>
            <TouchableOpacity onPress={() => setFilterTab(label)}>
              <View
                style={[
                  styles.row,
                  filterTab === "Today" && label === filterTab
                    ? { backgroundColor: theme.filterActiveButton }
                    : { backgroundColor: theme.filterInActiveButton },
                  filterTab === "Upcoming" && label === filterTab
                    ? { backgroundColor: theme.filterActiveButton }
                    : null,
                  filterTab === "Completed" && label === filterTab
                    ? { backgroundColor: theme.filterActiveButton }
                    : null,
                ]}
              >
                <Text
                  style={[
                    styles.rowLabel,
                    {
                      color:
                        label === filterTab ? theme.background : theme.color,
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

export default TasksTypeFilter;
