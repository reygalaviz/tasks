import React from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import constants from "../constants/constants";
import TaskFlatList from "../components/TaskFlatList";
import TaskCard from "../components/TaskCard";
import NoTaskFound from "../components/NoTaskFound";
import { useDeviceTheme } from "../theme/deviceTheme";
import Priority from "../components/Priority";
import moment from "moment";

function CompletedTasksScreen({
  updateStatus,
  moveToTrashBin,
  completedTasks,
  scrollY,
}) {
  const theme = useDeviceTheme();

  return (
    <View style={{ flex: 1 }}>
      {completedTasks.length === 0 && (
        <NoTaskFound message="No tasks have been completed" />
      )}
      {completedTasks && (
        <View style={{ flex: 1 }}>
          <TaskFlatList
            scrollY={scrollY}
            tasks={completedTasks}
            renderItem={({ item }) => {
              return (
                <TaskCard
                  task={item}
                  textStyle={{
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                    textDecorationColor: "black",
                  }}
                  updateStatus={() => updateStatus(item.id)}
                  handleDelete={() => moveToTrashBin(item.id)}
                  numberOfLines={1}
                  style={{ height: constants.completedCardHeight }}
                  compDel
                >
                  <View style={styles.timeContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.date}>
                        Marked completed on{"\n"}
                        {moment(item.completedOn).format("LL")}
                      </Text>
                    </View>
                    <Priority priorityTitle={item.priority} />
                  </View>
                </TaskCard>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: constants.cardDate,
    fontWeight: "600",
    width: "85%",
    color: "#302c27",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CompletedTasksScreen;
