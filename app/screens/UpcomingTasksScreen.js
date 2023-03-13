import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import TaskFlatList from "../components/TaskFlatList";
import TaskCard from "../components/TaskCard";

function UpcomingTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  search,
  setSearch,
  filteredNotes,
}) {
  return (
    <View style={{ fleX: 1 }}>
      {tasks.length === 0 && <Text>upcoming</Text>}
      {tasks && (
        <TaskFlatList
          tasks={filteredNotes}
          renderItem={({ item }) => {
            if (
              item &&
              item.completed == false &&
              item.trash == false &&
              item.date !== new Date().toString().slice(0, 15)
            ) {
              if (search === "") {
                return (
                  <TaskCard
                    task={item}
                    updateStatus={() => updateStatus(item.id, true)}
                    handleDelete={() => moveToTrashBin(item.id, true)}
                    pending
                  />
                );
              }
              if (item.name.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <TaskCard
                    task={item}
                    updateStatus={() => updateStatus(item.id, true)}
                    handleDelete={() => moveToTrashBin(item.id, true)}
                    pending
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

export default UpcomingTasksScreen;
