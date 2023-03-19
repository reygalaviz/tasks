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
  futureTasks,
  tasksToday,
  backlogTasks,
  style,
  tasks,
}) {
  const today = new Date().toISOString().slice(0, 10);

  const totalTasksCreatedThatDay = tasks.filter((item) => {
    const subtractDeletedTasks = item.trash == true && item.completed !== true;
    const t = item.date.slice(0, 10) === today;
    return t - subtractDeletedTasks;
  });

  const totalCompletedTasksThatDay = tasks.filter((item) => {
    return item.completed == true;
  });
  const totalTasksForToday = totalTasksCreatedThatDay.length;
  const tasksCompletedToday = totalCompletedTasksThatDay.filter(
    (task) =>
      (task.trash == true || task.trash == false) &&
      task.completed == true &&
      task.date.slice(0, 10) === new Date().toISOString().slice(0, 10)
  ).length;

  const TABS = [
    {
      key: "tab1",
      title: "Today",
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
        >
          {tasksCompletedToday} out of {totalTasksForToday} tasks done today.
        </Text>
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
              ? futureTasks.length
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
    fontSize: constants.tabText,
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
