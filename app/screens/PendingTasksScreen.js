import React, { useState } from "react";
import { View } from "react-native";
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
          if (
            item &&
            item.completed == false &&
            item.trash == false
            // item.date == new Date().toString().slice(0, 15)
          ) {
            if (search === "") {
              return (
                <TaskCard
                  task={item}
                  updateStatus={updateStatus}
                  moveToTrashBin={moveToTrashBin}
                />
              );
            }
            if (item.task.toLowerCase().includes(search.toLowerCase())) {
              return (
                <TaskCard
                  task={item}
                  updateStatus={updateStatus}
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
