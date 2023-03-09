import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import TaskFlatList from "../components/TaskFlatList";
import CompletedTaskCardContent from "../components/CompletedTaskCardContent";
import NoTaskFound from "../components/NoTaskFound";

function CompletedTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  deleteTask,
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
                  <CompletedTaskCardContent
                    task={item}
                    updateStatus={updateStatus}
                    deleteTask={deleteTask}
                    moveToTrashBin={moveToTrashBin}
                  />
                );
              }
              if (item.name.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <CompletedTaskCardContent
                    task={item}
                    updateStatus={updateStatus}
                    deleteTask={deleteTask}
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
