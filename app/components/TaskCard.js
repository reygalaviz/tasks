import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import constants from "../constants/constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Checkmark from "./Checkmark";
import Priority from "./Priority";
import Animated, {
  runOnJS,
  SlideInLeft,
  SlideOutLeft,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import themeContext from "../theme/themeContext";
import Swipeable from "react-native-gesture-handler/Swipeable";

function TaskCard({ task, deleteTask }) {
  const [isChecked, setIsChecked] = useState(task.completed);

  const handleCheckbox = (e) => {
    setIsChecked(!isChecked);
  };
  const theme = useContext(themeContext);

  const completedTasks = Object.values(task).filter(
    (task) => task.completed
  ).length;
  const remainingTasks = Object.values(task).length - completedTasks;

  const Card = () => {
    return (
      <View style={[, styles.taskContainer, {}]}>
        <View style={[, styles.task, { backgroundColor: task.color }]}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title]} numberOfLines={3}>
              {task.name}
            </Text>

            <BouncyCheckbox
              useNativeDriver={true}
              size={35}
              style={{ alignSelf: "flex-start" }}
              fillColor="##5CFF5C"
              unfillColor="#A3EBB1"
              iconStyle={{ borderColor: "black" }}
              innerIconStyle={{
                borderWidth: 1,
                borderColor: "black",
              }}
              onPress={handleCheckbox}
            />
          </View>

          <View>
            <View style={styles.dateContainer}>
              <MaterialIcons name="calendar-today" size={20} color="black" />
              <Text style={styles.date}>{task.date}</Text>
            </View>
            <View style={styles.timeContainer}>
              <View style={{ flexDirection: "row" }}>
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
          marginLeft: -15,
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
    <Swipeable renderRightActions={rightSwipeActions}>
      <Card />
    </Swipeable>

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
    marginBottom: constants.s / 2,
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
    width: "80%",
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
