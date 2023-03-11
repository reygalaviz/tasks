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
                    updateStatus={() => updateStatus(item.id, false)}
                    handleDelete={() => moveToTrashBin(item.id, true)}
                    compDel
                  />
                );
              }
              if (item.name.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <TaskCard
                    task={item}
                    updateStatus={() => updateStatus(item.id, false)}
                    handleDelete={() => moveToTrashBin(item.id, true)}
                    compDel
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
