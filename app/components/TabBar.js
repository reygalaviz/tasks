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

function TabBar({
  setActiveTabb,
  completedTasks,
  futureTasks,
  tasksToday,
  style,
}) {
  const TABS = [
    {
      key: "tab1",
      title: "Today",
      render: () => <PendingTasksScreen />,
    },
    {
      key: "tab2",
      title: "Upcoming",
      render: () => <UpcomingTasksScreen />,
    },
    {
      key: "tab3",
      title: "Done",
      render: () => <CompletedTasksScreen />,
    },
    {
      key: "tab4",
      title: "Waiting",
      render: () => <CompletedTasksScreen />,
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
            { color: theme.color },
            activeTab === 0 ? styles.activeTabText : null,
          ]}
        >
          Today
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
              { color: theme.color },
              activeTab === index + 1 ? styles.activeTabText : null,
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
              activeTab === index + 1 ? styles.activeTabText : null,
            ]}
          >
            {index === 0
              ? futureTasks.length
              : index === 1
              ? completedTasks.length
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
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  activeTab: {
    borderColor: "#673ab7",
  },
  activeTabText: {
    color: "black",
  },
});

export default TabBar;
