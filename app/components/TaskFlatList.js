import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import tempData from "../tempData";
import TaskCard from "./TaskCard";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import TaskItem from "./TaskItem";

function TaskFlatList({ tasks }) {
  const todoList = useRecoilValue(todoItem);
  return (
    <View style={styles.tasks}>
      {tasks
        .sort((a, b) => b.id - a.id)
        .map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
    </View>

    // <FlatList
    //   data={tempData}
    //   keyExtractor={(item) => item.name}
    //   showsVerticalScrollIndicator={false}
    //   renderItem={({ item }) => <TaskCard list={item} />}
    // />
  );
}
const styles = StyleSheet.create({
  tasks: {},
});

export default TaskFlatList;
