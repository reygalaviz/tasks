import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import constants from "../constants/constants";
import { MaterialIcons } from "@expo/vector-icons";
import Checkmark from "./Checkmark";
import Priority from "./Priority";
import Animated, {
  AnimatedLayout,
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import themeContext from "../theme/themeContext";

function TaskCard({ task }) {
  const [isChecked, setIsChecked] = useState("");
  const theme = useContext(themeContext);

  const completedTasks = Object.values(task).filter(
    (task) => task.completed
  ).length;

  const remainingTasks = Object.values(task).length - completedTasks;

  return (
    <Animated.View entering={SlideInLeft}>
      <Pressable style={[styles.container, { backgroundColor: task.color }]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title]} numberOfLines={3}>
            {task.name}
          </Text>

          <BouncyCheckbox
            useNativeDriver={true}
            size={25}
            style={{ alignSelf: "flex-start" }}
            fillColor="#B5EF8A"
            unfillColor={task.color}
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{
              borderWidth: 1,
              borderColor: isChecked ? "#B5EF8A" : theme.backgorund,
            }}
            onPress={(value) => setIsChecked(value)}
          />
        </View>

        <View>
          <View style={styles.dateContainer}>
            <MaterialIcons name="calendar-today" size={18} color="black" />
            <Text style={styles.date}>{task.date}</Text>
          </View>
          <View style={styles.timeContainer}>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="access-time" size={18} color="black" />
              <Text style={styles.date}>{task.time}</Text>
            </View>
            <Priority priorityTitle={task.priority} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: constants.cardHeight,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    paddingVertical: constants.s,
    paddingHorizontal: constants.m,
    marginVertical: constants.xs,
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
    fontWeight: "normal",
    marginLeft: constants.s,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default TaskCard;
