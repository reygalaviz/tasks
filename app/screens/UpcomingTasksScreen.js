import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SectionList,
  StyleSheet,
  Animated,
} from "react-native";
import TaskCard from "../components/TaskCard";
import { useDeviceTheme } from "../theme/deviceTheme";
import constants from "../constants/constants";
import { Octicons } from "@expo/vector-icons";
import Priority from "../components/Priority";
import moment from "moment";
import "moment-timezone";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

function UpcomingTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  upcomingTasks,
  scrollY,
}) {
  const theme = useDeviceTheme();

  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [thisWeekTasks, setThisWeekTasks] = useState([]);
  const [nextWeekTasks, setNextWeekTasks] = useState([]);
  const [thisMonthTasks, setThisMonthTasks] = useState([]);
  const [monthSections, setMonthSections] = useState([]);

  console.log(tomorrowTasks);

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
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    // generate sections for each month with upcoming tasks

    const taskMonths = new Set(
      upcomingTasks
        .filter(
          (task) => moment(task.date).format("M") !== moment(today).format("M")
        )
        .map((task) => moment(task.date).format("MMMM"))
    );
    const monthSections = Array.from(taskMonths).map((month) => {
      const tasksForMonth = upcomingTasks
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .filter((task) => {
          const taskDueDate = moment(task.date);

          if (taskDueDate.isSame(tomorrow, "day")) {
            return false;
          }
          // Exclude tasks that are this week
          if (taskDueDate.isBetween(startOfWeek, endOfWeek, "day", "[]")) {
            return false;
          }
          // Exclude tasks that are next week
          if (
            taskDueDate.isBetween(startOfNextWeek, endOfNextWeek, "day", "[]")
          ) {
            return false;
          }
          return moment(task.date).format("MMMM") === month;
        });
      return { title: month, data: tasksForMonth };
    });
    // tomorrow tasks
    const tomorrowTasks = upcomingTasks
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .filter((task) => {
        const taskDueDate = moment(task.date);
        return taskDueDate.isSame(tomorrow, "day");
      });

    //this week tasks
    const thisWeekTasks = upcomingTasks
      .sort((a, b) => new Date(a.date) - new Date(b.date))
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
      .sort((a, b) => new Date(a.date) - new Date(b.date))
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
    const thisMonthTasks = upcomingTasks
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .filter((task) => {
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
        if (
          taskDueDate.isBetween(startOfNextWeek, endOfNextWeek, "day", "[]")
        ) {
          return false;
        }
        return taskDueDate.isSame(moment(), "month");
      });

    setTomorrowTasks(tomorrowTasks);
    setThisWeekTasks(thisWeekTasks);
    setNextWeekTasks(nextWeekTasks);
    setThisMonthTasks(thisMonthTasks);
    setMonthSections(monthSections);
  }, [upcomingTasks]);

  let sections = [
    { title: "Tomorrow", data: tomorrowTasks },
    { title: "This Week", data: thisWeekTasks },
    { title: "Next Week", data: nextWeekTasks },
    { title: "This Month", data: thisMonthTasks },
    ...monthSections,
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
  const renderTaskItem = ({ item, section }) => {
    let formattedDate = "";
    if (item.date) {
      const taskDueDate = moment(item.date);
      const taskDueTime = moment(item.time);
      switch (section.title) {
        case "Tomorrow":
          formattedDate = "Tomorrow at " + taskDueTime.format("LT");
          break;
        case "This Week":
          formattedDate =
            taskDueDate.format("dddd [at] ") + taskDueTime.format("LT");
          break;
        case "Next Week":
        case "This Month":
        default:
          formattedDate = taskDueDate.format("ddd MMM D, [at] h:mm a");
          break;
      }
    }
    return (
      <TaskCard
        key={item.id}
        task={item}
        updateStatus={() => updateStatus(item.id)}
        handleDelete={() => moveToTrashBin(item.id)}
        pending
      >
        <View style={styles.timeContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Octicons
              name="calendar"
              size={constants.iconSize}
              color={"#302c27"}
            />
            <Text style={[styles.date, { color: "#302c27" }]}>
              {formattedDate}
            </Text>
          </View>
          <Priority priorityTitle={item.priority} />
        </View>
      </TaskCard>
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
      <AnimatedSectionList
        contentContainerStyle={{
          paddingTop: constants.flatListPaddingTop,
          paddingBottom: constants.xl,
        }}
        scrollEventThrottle={500}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
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
  },
  sectionContainer: {
    paddingHorizontal: constants.m,
    paddingVertical: constants.s,
  },
  sectionText: {
    fontSize: constants.sectionHeader,
    fontWeight: "700",
  },
  titleContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  title: {
    fontSize: constants.cardTitle,
    fontWeight: "bold",
    width: "100%",
  },
  dateContainer: {
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: constants.xs,
  },
  date: {
    fontSize: constants.cardDate,
    fontWeight: "600",
    marginLeft: constants.s,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default UpcomingTasksScreen;
