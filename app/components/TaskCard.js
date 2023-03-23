import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import constants from "../constants/constants";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

import { useDeviceTheme } from "../theme/deviceTheme";
function TaskCard({
  task,
  style,
  styleContainer,
  updateStatus,
  compDel,
  pending,
  handleDelete,
  textStyle,
  children,
  numberOfLines = 2,
}) {
  const navigation = useNavigation();
  const theme = useDeviceTheme();

  const onDetailsScreen = () => {
    navigation.navigate("DetailsScreen", { task });
  };

  const rightSwipeActions = () => {
    return (
      <Pressable
        onPress={handleDelete}
        style={{
          borderRadius: 15,
          height: constants.cardHeight,
          backgroundColor: "#ED6A5E",
          justifyContent: "center",
          alignItems: "flex-end",
          marginRight: constants.m,
          marginLeft: "-4%",
        }}
      >
        <View
          style={{
            paddingVertical: constants.m,
            paddingHorizontal: constants.l,
          }}
        >
          <Ionicons name="trash-outline" size={24} color="black" />
        </View>
      </Pressable>
    );
  };

  const leftSwipeActions = () => {
    return (
      <Pressable
        onPress={updateStatus}
        style={{
          borderRadius: 15,
          height: constants.cardHeight,
          marginLeft: constants.m,
          marginRight: "-4%",
          backgroundColor: "#77DD77",
          justifyContent: "center",
        }}
      >
        <Octicons
          name="check"
          size={24}
          color="black"
          style={{
            paddingVertical: constants.m,
            paddingHorizontal: constants.l,
          }}
        />
      </Pressable>
    );
  };

  const Card = () => {
    return (
      <Pressable
        onPress={onDetailsScreen}
        style={[, styles.taskContainer, styleContainer]}
      >
        <View style={[styles.task, style, { backgroundColor: task.color }]}>
          <View style={[styles.titleContainer]}>
            <Text
              style={[styles.title, textStyle]}
              numberOfLines={numberOfLines}
            >
              {task.name}
            </Text>
          </View>

          {children}
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      {pending && (
        <Swipeable
          renderRightActions={rightSwipeActions}
          renderLeftActions={leftSwipeActions}
        >
          <Card />
        </Swipeable>
      )}

      {compDel && (
        <Swipeable renderRightActions={rightSwipeActions}>
          <Card />
        </Swipeable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: constants.s,
    height: constants.cardHeight,
    // overflow: "hidden",
  },
  task: {
    height: constants.cardHeight,
    width: "90%",
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: constants.m,
    paddingVertical: constants.s,
  },
  titleContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  title: {
    fontSize: constants.cardTitle,
    fontWeight: "bold",
    width: "100%",
  },
});

export default TaskCard;
