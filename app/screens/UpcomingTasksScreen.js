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
  filteredNotes,
  deleteTask,
}) {
  const theme = useDeviceTheme();

  const today = new Date().toString().slice(0, 15);
  const futureTasks = filteredNotes.filter((item) => {
    return (
      item.date !== today && item.completed == false && item.trash == false
    );
  });
  return (
    <View style={{ flex: 1 }}>
      {futureTasks.length === 0 && <NoTaskFound message="No upcoming tasks" />}
      {futureTasks && (
        <View style={{ flex: 1 }}>
          <TaskFlatList
            tasks={futureTasks}
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

export default UpcomingTasksScreen;
