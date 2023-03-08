import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import constants from "../constants/constants";
import TaskCard from "../components/TaskCard";
import { Swipeable } from "react-native-gesture-handler";
import Priority from "./Priority";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  SlideInLeft,
  SlideOutRight,
  SlideOutUp,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

function PendingTaskCardContent({
  task,
  updateStatus,
  deleteTask,
  moveToTrashBin,
}) {
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
        onPress={() => moveToTrashBin(task.id, true)}
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
      <Pressable
        onPress={() => updateStatus(task.id, true)}
        style={{
          borderRadius: 10,
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

  const InnerCard = () => {
    return (
      <>
        <View style={[styles.titleContainer]}>
          <Text style={[styles.title, {}]} numberOfLines={3}>
            {task.name}
          </Text>
        </View>

        <View>
          <View style={styles.dateContainer}>
            <MaterialIcons
              name="calendar-today"
              size={constants.iconSize}
              color="black"
            />
            <Text style={styles.date}>{task.date}</Text>
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
              <Text style={styles.date}>{task.time}</Text>
            </View>
            <Priority priorityTitle={task.priority} />
          </View>
        </View>
      </>
    );
  };

  return (
    <Animated.View>
      <Swipeable
        renderRightActions={rightSwipeActions}
        renderLeftActions={leftSwipeActions}
      >
        <TaskCard task={task} onPress={onDetailsScreen}>
          <InnerCard />
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

export default PendingTaskCardContent;
