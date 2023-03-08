import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import themeContext from "../theme/themeContext";
import constants from "../constants/constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import PendingTasksScreen from "../screens/PendingTasksScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";

const tabs = ["Today", "Upcoming", "Completed"];

function TabBar({ tasks, setTasks, deleteTask, updateStatus, moveToTrashBin }) {
  const Tab = createMaterialTopTabNavigator();
  const theme = useContext(themeContext);

  const [selectedTab, setSelectedTab] = useState("Today");
  const [dataList, setDataList] = useState(tasks);

  const setTabFilter = (selectedTab) => {
    if (selectedTab !== "Today") {
      setDataList([...tasks.filter((e) => (e.selectedTab = selectedTab))]);
    } else {
      setDataList(tasks);
    }
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
          marginTop: constants.m,
          marginBottom: constants.s,
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
          tasks={tasks}
          setTasks={setTasks}
          deleteTask={deleteTask}
          updateStatus={updateStatus}
          moveToTrashBin={moveToTrashBin}
        />
      )}
      {selectedTab == "Completed" && (
        <CompletedTasksScreen
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
