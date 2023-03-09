import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import themeContext from "../theme/themeContext";
import constants from "../constants/constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import PendingTasksScreen from "../screens/PendingTasksScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import UpcomingTasksScreen from "../screens/UpcomingTasksScreen";

const tabs = ["Today", "Upcoming", "Completed"];

function TabBar({
  tasks,
  setTasks,
  deleteTask,
  updateStatus,
  moveToTrashBin,
  scrolling,
  search,
  setSearch,
}) {
  const Tab = createMaterialTopTabNavigator();
  const theme = useContext(themeContext);

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [sortedT, setSortedT] = useState([]);

  const setTabFilter = (selectedTab) => {
    let today = tasks;
    today = today.sort((a, b) => (a.name > b.name ? 1 : -1));
    setSortedT(today);
    setSelectedTab(selectedTab);
  };

  return (
    <>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: constants.m,
          marginVertical: constants.s,
        }}
      >
        {tabs.map((tab, index) => {
          return (
            <Pressable
              onPress={() => setTabFilter(tab)}
              key={index}
              style={[
                styles.container,
                {
                  backgroundColor:
                    selectedTab === tab ? theme.buttonColor : null,
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: selectedTab === tab ? theme.buttonText : theme.color,
                  },
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {selectedTab == "Today" && (
        <PendingTasksScreen
          search={search}
          setSearch={setSearch}
          tasks={tasks}
          setTasks={setTasks}
          deleteTask={deleteTask}
          updateStatus={updateStatus}
          moveToTrashBin={moveToTrashBin}
          scrolling={scrolling}
        />
      )}

      {selectedTab == "Upcoming" && (
        <UpcomingTasksScreen
          search={search}
          setSearch={setSearch}
          tasks={tasks}
          setTasks={setTasks}
          deleteTask={deleteTask}
          updateStatus={updateStatus}
          moveToTrashBin={moveToTrashBin}
          scrolling={scrolling}
        />
      )}

      {selectedTab == "Completed" && (
        <CompletedTasksScreen
          search={search}
          setSearch={setSearch}
          tasks={tasks}
          setTasks={setTasks}
          deleteTask={deleteTask}
          updateStatus={updateStatus}
          moveToTrashBin={moveToTrashBin}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: constants.s,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: constants.tabWidth,
    height: constants.tabHeight,
  },
  text: {
    fontWeight: "700",
    fontSize: constants.tabText,
  },
});

export default TabBar;
