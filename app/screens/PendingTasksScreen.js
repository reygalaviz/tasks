import React, { useState } from "react";
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
  scrolling,
  search,
  setSearch,
}) {
  return (
    <View style={{ flex: 1 }}>
      <TaskFlatList
        scrolling={scrolling}
        tasks={tasks}
        renderItem={({ item }) => {
          if (item.completed == false && item && item.trash == false) {
            if (search === "") {
              return (
                <PendingTaskCardContent
                  task={item}
                  updateStatus={updateStatus}
                  deleteTask={deleteTask}
                  moveToTrashBin={moveToTrashBin}
                />
              );
            }
            if (item.name.toLowerCase().includes(search.toLowerCase())) {
              return (
                <PendingTaskCardContent
                  task={item}
                  updateStatus={updateStatus}
                  deleteTask={deleteTask}
                  moveToTrashBin={moveToTrashBin}
                />
              );
            }
          }
        }}
      />
    </View>
  );
}

export default PendingTasksScreen;
