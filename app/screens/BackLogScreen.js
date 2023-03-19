import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import TaskFlatList from "../components/TaskFlatList";
import TaskCard from "../components/TaskCard";
import NoTaskFound from "../components/NoTaskFound";
import { useDeviceTheme } from "../theme/deviceTheme";

function BackLogScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  backlogTasks,
  deleteTask,
  scrollY,
}) {
  const theme = useDeviceTheme();

  return (
    <View style={{ flex: 1 }}>
      {backlogTasks.length === 0 && <NoTaskFound message="No tasks past due" />}
      {backlogTasks && (
        <TaskFlatList
          scrollY={scrollY}
          tasks={backlogTasks}
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

export default BackLogScreen;
