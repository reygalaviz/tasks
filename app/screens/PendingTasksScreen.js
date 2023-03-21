import React, { useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { color } from "react-native-reanimated";
import NoTaskFound from "../components/NoTaskFound";
import TaskCard from "../components/TaskCard";
import TaskFlatList from "../components/TaskFlatList";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";
import moment from "moment";

function PendingTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  search,
  setSearch,
  deleteTask,
  onscroll,
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
                    todayDateFormat
                  />
                );
              }}
            />
          </View>
        )}
      </View>
    </>
  );
}

export default PendingTasksScreen;
