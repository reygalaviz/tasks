import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import PendingTaskCardContent from "../components/PendingTaskCardContent";
import TaskCard from "../components/TaskCard";
import TaskFlatList from "../components/TaskFlatList";

function PendingTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  deleteTask,
  moveToTrashBin,
}) {
  return (
    <View style={{ flex: 1 }}>
      <TaskFlatList
        tasks={tasks}
        renderItem={({ item }) => {
          if (item && item.completed == false && item && item.trash == false) {
            return (
              <PendingTaskCardContent
                task={item}
                updateStatus={updateStatus}
                deleteTask={deleteTask}
                moveToTrashBin={moveToTrashBin}
              />
            );
          }
        }}
      />
    </View>
  );
}

export default PendingTasksScreen;
