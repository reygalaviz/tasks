import React, { useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import constants from "../constants/constants";

function TaskFlatList({
  tasks,
  renderItem,
  keyExtractor,
  scrollY,
  flatListRef,
}) {
  return (
    <Animated.FlatList
      ref={flatListRef}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      data={tasks}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        flexGrow: 0,
        paddingTop: constants.flatListPaddingTop,
        paddingBottom: constants.xl,
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
