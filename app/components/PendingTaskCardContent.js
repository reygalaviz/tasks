import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import constants from "../constants/constants";
import TaskCard from "../components/TaskCard";
import { Swipeable } from "react-native-gesture-handler";
import Priority from "./Priority";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft } from "react-native-reanimated";

function PendingTaskCardContent({ task, updateStatus, deleteTask }) {
  const navigation = useNavigation();

  const onDetailsScreen = () => {
    navigation.navigate("DetailsScreen", {
      selectedTask: task,
      id: task.id,
    });
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
      <View
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
      </View>
    );
  };
  return (
    <Animated.View entering={SlideInLeft}>
      <Swipeable
        renderLeftActions={leftSwipeActions}
        renderRightActions={rightSwipeActions}
      >
        <TaskCard task={task} onPress={onDetailsScreen}>
          <View style={[styles.titleContainer]}>
            <Text style={[styles.title, {}]} numberOfLines={3}>
              {task.name}
            </Text>
            <Pressable onPress={() => updateStatus(task.id, true)}>
              <Text>complete me</Text>
            </Pressable>
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
        </TaskCard>
      </Swipeable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
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

export default PendingTaskCardContent;
