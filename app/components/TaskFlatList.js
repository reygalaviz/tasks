import React, { useRef } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import tempData from "../tempData";
import TaskCard from "./TaskCard";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import constants from "../constants/constants";
import Animated from "react-native-reanimated";

function TaskFlatList({ tasks, scrolling }) {
  const todoList = useRecoilValue(todoItem);

  return (
    // <View style={styles.tasks}>
    //   {tasks
    //     .sort((a, b) => b.id - a.id)
    //     .map((task) => (
    //       <TaskCard key={task.id} task={task} />
    //     ))}
    // </View>

    <Animated.FlatList
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrolling } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      style={{ flex: 1 }}
      data={tasks}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        marginHorizontal: constants.m,
        paddingBottom: constants.l,
      }}
      renderItem={({ item }) => <TaskCard key={item.id} task={item} />}
    />
  );
}
const styles = StyleSheet.create({});

export default TaskFlatList;
