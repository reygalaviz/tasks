import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import TaskFlatList from "../components/TaskFlatList";
import TaskCard from "../components/TaskCard";
import NoTaskFound from "../components/NoTaskFound";
import { useDeviceTheme } from "../theme/deviceTheme";

function UpcomingTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  search,
  setSearch,
  futureTasks,
  deleteTask,
  scrollY,
}) {
  const theme = useDeviceTheme();

  const sortedTasks = futureTasks.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <View style={{ flex: 1 }}>
      {futureTasks.length === 0 && <NoTaskFound message="No upcoming tasks" />}
      {futureTasks && (
        <TaskFlatList
          scrollY={scrollY}
          tasks={sortedTasks}
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
      )}
    </View>
  );
}

export default UpcomingTasksScreen;
