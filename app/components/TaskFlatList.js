import React, { useRef } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import tempData from "../tempData";
import TaskCard from "./TaskCard";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import constants from "../constants/constants";
import Animated from "react-native-reanimated";

function TaskFlatList({ tasks }) {
  const todoList = useRecoilValue(todoItem);

  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    50
  );
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
        [
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ],
        { useNativeDriver: true }
      )}
      data={tasks}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ marginHorizontal: constants.m }}
      renderItem={({ item }) => <TaskCard key={item.id} task={item} />}
    />
  );
}
const styles = StyleSheet.create({});

export default TaskFlatList;
