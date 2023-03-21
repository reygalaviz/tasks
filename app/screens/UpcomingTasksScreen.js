import React, { useState, useEffect } from "react";
import { View, Text, Pressable, SectionList, StyleSheet } from "react-native";
import TaskCard from "../components/TaskCard";
import { useDeviceTheme } from "../theme/deviceTheme";
import constants from "../constants/constants";
import moment from "moment";

function UpcomingTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  upcomingTasks,
}) {
  const theme = useDeviceTheme();

  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [thisWeekTasks, setThisWeekTasks] = useState([]);
  const [nextWeekTasks, setNextWeekTasks] = useState([]);
  const [thisMonthTasks, setThisMonthTasks] = useState([]);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysUntilMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Number of days until Monday
    const monday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - daysUntilMonday + 1
    );
    const startOfWeek = moment().startOf("isoWeek");
    const endOfWeek = moment().endOf("isoWeek");
    const startOfNextWeek = moment().add(1, "weeks").startOf("isoWeek");
    const endOfNextWeek = moment().add(1, "weeks").endOf("isoWeek");

    const tomorrow = new Date(
      monday.getFullYear(),
      monday.getMonth(),
      monday.getDate() + 1
    );

    // tomorrow tasks
    const tomorrowTasks = upcomingTasks
      .sort((a, b) => new Date(a.time) - new Date(b.time))
      .filter((task) => {
        const taskDueDate = moment(task.date);
        return taskDueDate.isSame(tomorrow, "day");
      });

    //this week tasks

    const thisWeekTasks = upcomingTasks
      .sort(
        (a, b) =>
          new Date(a.date).toLocaleString() - new Date(b.date).toLocaleString()
      )
      .filter((task) => {
        const taskDueDate = moment(task.date);
        // Exclude tasks that are due tomorrow
        if (taskDueDate.isSame(tomorrow, "day")) {
          return false;
        }
        return taskDueDate.isBetween(startOfWeek, endOfWeek, "day", "[]");
      });

    //next week tasks
    const nextWeekTasks = upcomingTasks
      .sort(
        (a, b) =>
          new Date(a.date).toLocaleString() - new Date(b.date).toLocaleString()
      )
      .filter((task) => {
        const taskDueDate = moment(task.date);
        return taskDueDate.isBetween(
          startOfNextWeek,
          endOfNextWeek,
          "day",
          "[]"
        );
      });

    //this month tasks
    const thisMonthTasks = upcomingTasks.filter((task) => {
      const taskDueDate = moment(task.date);
      // Exclude tasks that are due tomorrow
      if (taskDueDate.isSame(tomorrow, "day")) {
        return false;
      }
      // Exclude tasks that are this week
      if (taskDueDate.isBetween(startOfWeek, endOfWeek, "day", "[]")) {
        return false;
      }
      // Exclude tasks that are next week
      if (taskDueDate.isBetween(startOfNextWeek, endOfNextWeek, "day", "[]")) {
        return false;
      }
      return taskDueDate.isSame(moment(), "month");
    });

    setTomorrowTasks(tomorrowTasks);
    setThisWeekTasks(thisWeekTasks);
    setNextWeekTasks(nextWeekTasks);
    setThisMonthTasks(thisMonthTasks);
  }, [upcomingTasks]);

  let sections = [
    { title: "Tomorrow", data: tomorrowTasks },
    { title: "This Week", data: thisWeekTasks },
    { title: "Next Week", data: nextWeekTasks },
    { title: "This Month", data: thisMonthTasks },
  ];
  // Remove "Tomorrow" section if there are no tasks for tomorrow
  if (tomorrowTasks.length === 0) {
    sections = sections.filter((section) => section.title !== "Tomorrow");
  }
  if (thisWeekTasks.length === 0) {
    sections = sections.filter((section) => section.title !== "This Week");
  }
  if (nextWeekTasks.length === 0) {
    sections = sections.filter((section) => section.title !== "Next Week");
  }
  if (thisMonthTasks.length === 0) {
    sections = sections.filter((section) => section.title !== "This Month");
  }

  // Render individual task item
  const renderTaskItem = ({ item }) => {
    return (
      <TaskCard
        key={item.id}
        task={item}
        showDate
        updateStatus={() => updateStatus(item.id)}
        handleDelete={() => moveToTrashBin(item.id)}
        pending
        upcomingDateFormat
      />
    );
  };
  // Render section header
  const renderSectionHeader = ({ section }) => {
    return (
      <View
        key={section.title}
        style={[styles.sectionContainer, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.sectionText, { color: theme.color }]}>
          {section.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        keyExtractor={(item, index) => item + index}
        sections={sections}
        renderItem={renderTaskItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: constants.flatListPaddingTop,
    paddingBottom: constants.xl,
  },
  sectionContainer: {
    paddingHorizontal: constants.m,
    paddingVertical: constants.s,
  },
  sectionText: {
    fontSize: constants.sectionHeader,
    fontWeight: "700",
  },
});

export default UpcomingTasksScreen;
