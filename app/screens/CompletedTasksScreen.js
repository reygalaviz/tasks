import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import TaskFlatList from "../components/TaskFlatList";
import TaskCard from "../components/TaskCard";
import CompletedTaskCardContent from "../components/CompletedTaskCardContent";

function CompletedTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  deleteTask,
  moveToTrashBin,
}) {
  return (
    <View style={{ flex: 1 }}>
      {tasks && (
        <TaskFlatList
          tasks={tasks}
          renderItem={({ item }) => {
            if (item && item.completed == true && item && item.trash == false)
              return (
                <CompletedTaskCardContent
                  task={item}
                  updateStatus={updateStatus}
                  deleteTask={deleteTask}
                  moveToTrashBin={moveToTrashBin}
                />
              );
          }}
        />
      )}
    </View>
  );
}

export default CompletedTasksScreen;
