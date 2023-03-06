import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import constants from "../constants/constants";
import TaskCard from "../components/TaskCard";
import { Swipeable } from "react-native-gesture-handler";
import Priority from "./Priority";
import { useNavigation } from "@react-navigation/native";

function CompletedTaskCardContent({ task, updateStatus, deleteTask }) {
  const navigation = useNavigation();

  const rightSwipeActions = () => {
    return (
      <Pressable
        onPress={() => deleteTask(task.id)}
        style={{
          borderRadius: 10,
          height: constants.completedCardHeight,
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
    <Swipeable renderRightActions={rightSwipeActions}>
      <TaskCard task={task} style={styles.container}>
        <View style={[styles.titleContainer]}>
          <Text style={[styles.title]} numberOfLines={3}>
            {task.name}
          </Text>
          <Pressable onPress={() => updateStatus(task.id, false)}>
            <Text>uncomplete me</Text>
          </Pressable>
        </View>

        <View>
          <View style={styles.timeContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.date}>completed on {task.time}</Text>
            </View>
            <Priority priorityTitle={task.priority} />
          </View>
        </View>
      </TaskCard>
    </Swipeable>
  );
}
const styles = StyleSheet.create({
  container: {
    height: constants.completedCardHeight,
    borderTopRightRadius: 10,
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

export default CompletedTaskCardContent;
