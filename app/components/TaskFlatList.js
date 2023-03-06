import React, { useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import TaskCard from "./TaskCard";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import constants from "../constants/constants";

function TaskFlatList({ tasks, renderItem }) {
  const todoList = useRecoilValue(todoItem);
  const scrollRef = useRef();

  return (
    <FlatList
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
