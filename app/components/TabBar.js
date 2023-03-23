import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import constants from "../constants/constants";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useDeviceTheme } from "../theme/deviceTheme";

import PendingTasksScreen from "../screens/PendingTasksScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import UpcomingTasksScreen from "../screens/UpcomingTasksScreen";
import BackLogScreen from "../screens/BackLogScreen";

function TabBar({
  setActiveTabb,
  completedTasks,
  upcomingTasks,
  todayTasks,
  backlogTasks,
  style,
  tasks,
}) {
  const now = new Date();
  const today = now.toLocaleDateString();

  // Filter tasks for today
  const tasksForToday = tasks.filter((item) => {
    const taskDueDate = new Date(item.date);
    const subtractDeletedTasks = item.trash;
    const t = taskDueDate.toLocaleDateString() === today;
    return t - subtractDeletedTasks;
  });

  // Count completed tasks for today
  const completedTasksForToday = tasksForToday.filter((item) => item.completed);
  const numCompletedTasksForToday = completedTasksForToday.length;

  // Display the result to the user
  const numTasksForToday = tasksForToday.length;
  const message = `${numCompletedTasksForToday} out of ${numTasksForToday} done today.`;

  const TABS = [
    {
      key: "tab1",
      title: "today",
      render: () => <PendingTasksScreen />,
    },
    {
      key: "tab2",
      title: "upcoming",
      render: () => <UpcomingTasksScreen />,
    },
    {
      key: "tab3",
      title: "done",
      render: () => <CompletedTasksScreen />,
    },
    {
      key: "tab4",
      title: "backlog",
      render: () => <BackLogScreen />,
    },
  ];
  const theme = useDeviceTheme();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
    setActiveTabb(index);
  };

  return (
    <View style={[styles.tabContainer, style]}>
      <TouchableOpacity
        style={[
          styles.todayTab,
          { backgroundColor: theme.inactiveTabColor },
          activeTab === 0 && { backgroundColor: theme.activeTabColor },
        ]}
        onPress={() => handleTabPress(0)}
      >
        <Text
          style={[
            styles.tabText,
            { color: theme.textBoxBGColor },
            activeTab === 0 ? styles.activeTabText : styles.inActiveTabText,
          ]}
        >
          today
        </Text>
        <Text
          style={[
            { color: theme.textBoxBGColor },
            styles.tabText,
            activeTab === 0 ? styles.activeTabText : styles.inActiveTabText,
          ]}
        ></Text>
      </TouchableOpacity>
      {TABS.slice(1).map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            { backgroundColor: theme.inactiveTabColor },

            activeTab === index + 1
              ? { backgroundColor: theme.activeTabColor }
              : null,
          ]}
          onPress={() => handleTabPress(index + 1)}
        >
          <Text
            style={[
              styles.tabText,
              { color: theme.textBoxBGColor },
              activeTab === index + 1
                ? styles.activeTabText
                : styles.inActiveTabText,
            ]}
          >
            {tab.title}
          </Text>
          <Text
            style={[
              {
                fontWeight: "500",
                color: theme.textBoxBGColor,
              },
              activeTab === index + 1
                ? styles.activeTabText
                : styles.inActiveTabText,
            ]}
          >
            {index === 0
              ? upcomingTasks.length
              : index === 1
              ? completedTasks.length
              : index === 2
              ? backlogTasks.length
              : null}{" "}
            tasks
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    marginHorizontal: constants.m,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  todayTab: {
    width: "100%",
    height: 100,
    padding: constants.s,
    marginBottom: constants.xs,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tab: {
    height: 80,
    borderRadius: 10,
    width: "32%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: constants.s,
  },
  tabText: {
    fontSize: constants.tabBarText,
    fontWeight: "700",
    color: "#222",
  },
  activeTab: {
    borderColor: "#673ab7",
  },
  inActiveTabText: {
    fontSize: constants.tabBarInActFontSize,
    fontWeight: "600",
  },
  activeTabText: {
    color: "black",
    fontSize: constants.tabBarActiveFontSize,
    fontWeight: "700",
  },
});

export default TabBar;
