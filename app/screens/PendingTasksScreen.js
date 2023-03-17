import React, { useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { color } from "react-native-reanimated";
import NoTaskFound from "../components/NoTaskFound";
import TaskCard from "../components/TaskCard";
import TaskFlatList from "../components/TaskFlatList";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";

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
  tasksToday,
}) {
  const theme = useDeviceTheme();

  const sortedTasks = tasksToday.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <View style={{ flex: 1 }}>
      {tasksToday.length === 0 && <NoTaskFound message="No tasks for today" />}
      {tasksToday && (
        <View style={{ flex: 1 }}>
          <TaskFlatList
            flatListRef={flatListRef}
            oscroll={onscroll}
            tasks={sortedTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TaskCard
                  task={item}
                  updateStatus={() => updateStatus(item.id)}
                  handleDelete={() => moveToTrashBin(item.id)}
                  pending
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

export default PendingTasksScreen;
