import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import tempData from "../tempData";
import TaskCard from "./TaskCard";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";

function TaskFlatList({ tasks }) {
  const todoList = useRecoilValue(todoItem);
  return (
    // <View style={styles.tasks}>
    //   {tasks
    //     .sort((a, b) => b.id - a.id)
    //     .map((task) => (
    //       <TaskCard key={task.id} task={task} />
    //     ))}
    // </View>

    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <TaskCard key={item.id} task={item} />}
    />
  );
}
const styles = StyleSheet.create({});

export default TaskFlatList;
