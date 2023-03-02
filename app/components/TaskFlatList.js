import React, { useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import tempData from "../tempData";
import TaskCard from "./TaskCard";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import constants from "../constants/constants";
import Animated from "react-native-reanimated";
import {
  NativeViewGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";

function TaskFlatList({ tasks, deleteTask, onDetailsScreen }) {
  const todoList = useRecoilValue(todoItem);
  const scrollRef = useRef();

  return (
    // <View style={styles.tasks}>
    //   {tasks
    //     .sort((a, b) => b.id - a.id)
    //     .map((task) => (
    //       <TaskCard key={task.id} task={task} />
    //     ))}
    // </View>

    <FlatList
      style={{ flex: 1 }}
      data={tasks}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        paddingBottom: constants.l,
      }}
      renderItem={({ item }) => (
        <TaskCard deleteTask={deleteTask} key={item.id} task={item} />
      )}
    />
  );
}
const styles = StyleSheet.create({});

export default TaskFlatList;
