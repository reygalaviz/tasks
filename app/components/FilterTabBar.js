import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";
import { Entypo } from "@expo/vector-icons";

import TasksColorFilter from "./TasksColorFilter";
import TasksPriorityFilter from "./TasksPriorityFilter";
import TasksSortByFilter from "./TasksSortByFilter";

function FilterTabBar({
  tasks,
  setTasks,
  filterNotes,
  priorityPicked,
  setPriorityPicked,
  colorsPicked,
  setColorsPicked,
  sortBy,
  setSortBy,
}) {
  const theme = useDeviceTheme();

  const tabs = ["colors", "priority", "sort by"];
  const [activeColorTab, setActiveColorTab] = useState(0);
  const [activePTab, setActivePTab] = useState(0);

  const filterSheetRef = useRef();
  const filterModal = () => {
    filterSheetRef.current.open();
  };

  const colorSheetRef = useRef();
  const colorModal = () => {
    colorSheetRef.current.open();
  };

  const pSheetRef = useRef();
  const priorityModal = () => {
    pSheetRef.current.open();
  };

  const sortBySheetRef = useRef();
  const sortByModal = () => {
    sortBySheetRef.current.open();
  };

  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }, [index]);

  return (
    <>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: constants.m,
        }}
      >
        {tabs.map((tab, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.container,
                activeColorTab == true && index === 0
                  ? { backgroundColor: theme.filterActiveButton }
                  : activePTab == true && index === 1
                  ? { backgroundColor: theme.filterActiveButton }
                  : { backgroundColor: theme.filterInActiveButton },
              ]}
              onPress={() => {
                {
                  index === 0 ? colorModal() : null;
                }
                {
                  index === 1 ? priorityModal() : null;
                }
                {
                  index === 2 ? sortByModal() : null;
                }
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      activeColorTab == true && index === 0
                        ? theme.background
                        : activePTab == true && index === 1
                        ? theme.background
                        : theme.color,
                  },
                ]}
              >
                {tab}
              </Text>
              <Entypo
                name="chevron-small-down"
                size={24}
                color={
                  activeColorTab == true && index === 0
                    ? theme.background
                    : activePTab == true && index === 1
                    ? theme.background
                    : theme.color
                }
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TasksColorFilter
        colorSheetRef={colorSheetRef}
        tasks={tasks}
        colorsPicked={colorsPicked}
        setColorsPicked={setColorsPicked}
        filterNotes={filterNotes}
        setTasks={setTasks}
        setActiveColorTab={setActiveColorTab}
      />

      <TasksPriorityFilter
        pSheetRef={pSheetRef}
        priorityPicked={priorityPicked}
        setPriorityPicked={setPriorityPicked}
        filterNotes={filterNotes}
        tasks={tasks}
        setTasks={setTasks}
        setActivePTab={setActivePTab}
      />

      <TasksSortByFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortByModal={sortByModal}
        sortBySheetRef={sortBySheetRef}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: constants.filterTabHeight,
    marginRight: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    flexDirection: "row",
  },
  text: {
    fontWeight: "700",
    fontSize: constants.filterTabBarFontSize,
  },
});

export default FilterTabBar;
