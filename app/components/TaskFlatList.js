import React, { useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import TaskCard from "./TaskCard";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import constants from "../constants/constants";
import Animated from "react-native-reanimated";

function TaskFlatList({ tasks, renderItem, scrolling }) {
  const todoList = useRecoilValue(todoItem);
  const scrollRef = useRef();

  return (
    <Animated.FlatList
      // scrollEventThrottle={16}
      // onScroll={Animated.event([
      //   { nativeEvent: { contentOffset: { y: scrolling } } },
      // ])}
      data={tasks}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        paddingBottom: constants.l,
      }}
      renderItem={({ item, index }) => {
        if (renderItem) {
          return renderItem({
            item,
            index,
          });
        }
        return null;
      }}
    />
  );
}
const styles = StyleSheet.create({});

export default TaskFlatList;
