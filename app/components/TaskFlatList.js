import React, { useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import TaskCard from "./TaskCard";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import constants from "../constants/constants";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import HeaderBar from "./HeaderBar";
import NotificationsButton from "../components/NotificationsButton";
import SettingsButton from "../components/SettingsButton";

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
