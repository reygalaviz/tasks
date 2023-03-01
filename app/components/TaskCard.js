import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import constants from "../constants/constants";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import Checkmark from "./Checkmark";
import Priority from "./Priority";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import themeContext from "../theme/themeContext";
import Swipeable from "react-native-gesture-handler/Swipeable";

function TaskCard({ task, deleteTask }) {
  const theme = useContext(themeContext);

  const completedTasks = Object.values(task).filter(
    (task) => task.completed
  ).length;
  const remainingTasks = Object.values(task).length - completedTasks;

  const Card = () => {
    return (
      <View style={[, styles.taskContainer, {}]}>
        <View style={[, styles.task, { backgroundColor: task.color }]}>
          <View style={[styles.titleContainer]}>
            <Text style={[styles.title, {}]} numberOfLines={3}>
              {task.name}
            </Text>
          </View>

          <View>
            <View style={styles.dateContainer}>
              <MaterialIcons name="calendar-today" size={20} color="black" />
              <Text style={styles.date}>{task.date}</Text>
            </View>
            <View style={styles.timeContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="access-time" size={20} color="black" />
                <Text style={styles.date}>{task.time}</Text>
              </View>
              <Priority priorityTitle={task.priority} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const rightSwipeActions = () => {
    return (
      <Pressable
        onPress={() => deleteTask(task.id)}
        style={{
          borderRadius: 10,
          height: constants.cardHeight,
          backgroundColor: "#ED6A5E",
          justifyContent: "center",
          alignItems: "flex-end",
          marginRight: constants.m,
          marginLeft: "-4%",
        }}
      >
        <Animated.View
          style={{
            paddingVertical: constants.m,
            paddingHorizontal: constants.l,
          }}
        >
          <Ionicons name="trash-outline" size={24} color="black" />
        </Animated.View>
      </Pressable>
    );
  };

  const leftSwipeActions = () => {
    return (
      <Animated.View
        style={{
          borderRadius: 10,
          height: constants.cardHeight,
          marginHorizontal: constants.m,
          backgroundColor: "#77DD77",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Octicons
          name="check"
          size={24}
          color="black"
          style={{
            paddingVertical: constants.m,
            paddingHorizontal: constants.l,
          }}
        />
      </Animated.View>
    );
  };

  return (
    <Animated.View entering={SlideInLeft}>
      <Swipeable
        renderLeftActions={leftSwipeActions}
        renderRightActions={rightSwipeActions}
      >
        <Card />
      </Swipeable>
    </Animated.View>

    // <Animated.View entering={SlideInLeft}>
    //   <Card />
    // </Animated.View>
  );
}
const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: constants.s + 1,
  },
  task: {
    height: constants.cardHeight,
    width: "90%",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    paddingVertical: constants.s,
    paddingHorizontal: constants.m,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  titleContainer: {
    flexDirection: "row",
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
    alignItems: "flex-end",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  iconContainer: {
    backgroundColor: "#ED6A5E",
    width: constants.cardHeight,
    height: constants.cardHeight,
    position: "absolute",
    right: constants.m,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default TaskCard;
