import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import NoTaskFound from "../components/NoTaskFound";
import TaskCard from "../components/TaskCard";
import TaskFlatList from "../components/TaskFlatList";
import Priority from "../components/Priority";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";
import { Octicons } from "@expo/vector-icons";
import moment from "moment";

function PendingTasksScreen({
  updateStatus,
  moveToTrashBin,
  flatListRef,
  todayTasks,
  scrollY,
}) {
  const theme = useDeviceTheme();

  const sortedTasks = todayTasks.sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );

  return (
    <>
      {todayTasks.length === 0 && <NoTaskFound message="No tasks for today" />}
      <View style={{ flex: 1 }}>
        {todayTasks && (
          <View style={{ flex: 1 }}>
            <TaskFlatList
              flatListRef={flatListRef}
              scrollY={scrollY}
              tasks={sortedTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <TaskCard
                    task={item}
                    showDate
                    updateStatus={() => updateStatus(item.id)}
                    handleDelete={() => moveToTrashBin(item.id)}
                    pending
                  >
                    <View style={styles.timeContainer}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Octicons
                          name="calendar"
                          size={constants.iconSize}
                          color={"#302c27"}
                        />
                        <Text style={[styles.date, { color: "#302c27" }]}>
                          Today at {moment(item.time).format("LT")}
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
    </>
  );
}

const styles = StyleSheet.create({
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
  dateContainer: {
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: constants.xs,
  },
  date: {
    fontSize: constants.cardDate,
    fontWeight: "600",
    marginLeft: constants.s,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PendingTasksScreen;
