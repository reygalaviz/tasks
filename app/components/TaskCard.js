import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import Priority from "./Priority";
import { firebase } from "../../firebaseConfig";

function TaskCard({
  task,
  style,
  styleContainer,
  updateStatus,
  moveToTrashBin,
}) {
  // const completedTasks = Object.values(task).filter(
  //   (task) => task.completed
  // ).length;
  // const remainingTasks = Object.values(task).length - completedTasks;

  const navigation = useNavigation();

  const handleDeleteTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(task.id)
      .delete()
      .catch((err) => {
        alert(err);
      });
  };

  const onDetailsScreen = () => {
    navigation.navigate("DetailsScreen", { task });
  };
  const rightSwipeActions = () => {
    return (
      <Pressable
        onPress={() => moveToTrashBin(task.id, true)}
        style={{
          borderRadius: 10,
          height: constants.cardHeight,
          borderWidth: 1,
          borderBottomWidth: 5,
          borderColor: "#333333",
          backgroundColor: "#ED6A5E",
          justifyContent: "center",
          alignItems: "flex-end",
          marginRight: constants.m,
          marginLeft: "-4%",
        }}
      >
        <View
          style={{
            paddingVertical: constants.m,
            paddingHorizontal: constants.l,
          }}
        >
          <Ionicons name="trash-outline" size={24} color="black" />
        </View>
      </Pressable>
    );
  };

  const leftSwipeActions = () => {
    return (
      <Pressable
        onPress={() => updateStatus(task.id, true)}
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderBottomWidth: 5,
          borderColor: "#333333",
          height: constants.cardHeight,
          marginLeft: constants.m,
          marginRight: "-4%",
          backgroundColor: "#77DD77",
          justifyContent: "center",
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
      </Pressable>
    );
  };

  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      renderLeftActions={leftSwipeActions}
    >
      <Pressable
        onPress={onDetailsScreen}
        style={[, styles.taskContainer, styleContainer]}
      >
        <View
          style={[
            styles.task,
            style,
            { backgroundColor: task.color, borderColor: "#333333" },
          ]}
        >
          <View style={[styles.titleContainer]}>
            <Text style={[styles.title, {}]} numberOfLines={3}>
              {task.task}
            </Text>
          </View>

          <View>
            <View style={styles.dateContainer}>
              <MaterialIcons
                name="calendar-today"
                size={constants.iconSize}
                color="black"
              />
              {/* <Text style={styles.date}>{task.date}</Text> */}
            </View>
            <View style={styles.timeContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="access-time"
                  size={constants.iconSize}
                  color="black"
                />
                {/* <Text style={styles.date}>{format(task.time, "hh:mm a")}</Text> */}
              </View>
              <Priority priorityTitle={task.priority} />
            </View>
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
}
const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: constants.s,
    height: constants.cardHeight,
    // overflow: "hidden",
  },
  task: {
    height: constants.cardHeight,
    width: "90%",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: constants.m,
    paddingVertical: constants.s,
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
    alignItems: "flex-end",
    justifyContent: "space-between",
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
