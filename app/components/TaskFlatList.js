import React, { useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import constants from "../constants/constants";

function TaskFlatList({
  tasks,
  renderItem,
  keyExtractor,
  onscroll,
  flatListRef,
}) {
  return (
    <FlatList
      ref={flatListRef}
      onScroll={onscroll}
      data={tasks}
      keyExtractor={keyExtractor}
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
