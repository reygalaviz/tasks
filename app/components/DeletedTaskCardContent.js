import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import constants from "../constants/constants";
import TaskCard from "../components/TaskCard";
import { Swipeable } from "react-native-gesture-handler";
import Priority from "./Priority";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft } from "react-native-reanimated";

function DeletedTaskCardContent({
  task,
  updateStatus,
  deleteTask,
  moveToTrashBin,
}) {
  const navigation = useNavigation();

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

  return (
    <Animated.View>
      <Swipeable renderRightActions={rightSwipeActions}>
        <TaskCard
          task={task}
          style={{
            height: constants.cardHeight,
          }}
        >
          <View style={[styles.titleContainer]}>
            <Text style={[styles.title, {}]} numberOfLines={3}>
              {task.name}
            </Text>
          </View>

          <View>
            <View style={styles.timeContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.date}>Deleted on {task.date}</Text>
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
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default DeletedTaskCardContent;
