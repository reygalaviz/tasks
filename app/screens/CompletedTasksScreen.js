import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import TaskFlatList from "../components/TaskFlatList";
import TaskCard from "../components/TaskCard";

function CompletedTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  search,
  setSearch,
}) {
  return (
    <View style={{ flex: 1 }}>
      {tasks && (
        <TaskFlatList
          tasks={tasks}
          renderItem={({ item }) => {
            if (item && item.completed == true && item.trash == false) {
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
              } else {
                return <NoTaskFound search={search} />;
              }
            }
          }}
        />
      )}
    </View>
  );
}

export default CompletedTasksScreen;
