import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import TaskFlatList from "../components/TaskFlatList";
import TaskCard from "../components/TaskCard";
import NoTaskFound from "../components/NoTaskFound";
import { useDeviceTheme } from "../theme/deviceTheme";

function CompletedTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  search,
  setSearch,
  completedTasks,
  deleteTask,
  scrollY,
}) {
  const theme = useDeviceTheme();

  return (
    <View style={{ flex: 1 }}>
      {completedTasks.length === 0 && (
        <NoTaskFound message="No tasks have been completed" />
      )}
      {completedTasks && (
        <TaskFlatList
          scrollY={scrollY}
          tasks={completedTasks}
          renderItem={({ item }) => {
            return (
              <TaskCard
                task={item}
                updateStatus={() => updateStatus(item.id)}
                handleDelete={() => moveToTrashBin(item.id)}
                compDel
              />
            );
          }}
        />
      )}
    </View>
  );
}

export default CompletedTasksScreen;
