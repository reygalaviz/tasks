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
  filteredNotes,
  deleteTask,
}) {
  return (
    <View style={{ flex: 1 }}>
      {tasks.length === 0 && <Text>completed</Text>}
      {tasks && (
        <TaskFlatList
          tasks={filteredNotes}
          renderItem={({ item }) => {
            if (item && item.completed == true && item.trash == false) {
              if (search === "") {
                return (
                  <TaskCard
                    task={item}
                    updateStatus={() => updateStatus(item.id)}
                    handleDelete={() => moveToTrashBin(item.id)}
                    compDel
                  />
                );
              }
              if (item.name.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <TaskCard
                    task={item}
                    updateStatus={() => updateStatus(item.id)}
                    handleDelete={() => moveToTrashBin(item.id)}
                    compDel
                  />
                );
              }
            }
          }}
        />
      )}
    </View>
  );
}

export default CompletedTasksScreen;
