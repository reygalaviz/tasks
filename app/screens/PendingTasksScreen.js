import React, { useState } from "react";
import { View, Text } from "react-native";
import { color } from "react-native-reanimated";
import NoTaskFound from "../components/NoTaskFound";
import TaskCard from "../components/TaskCard";
import TaskFlatList from "../components/TaskFlatList";
import constants from "../constants/constants";

function PendingTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  scrolling,
  search,
  setSearch,
  filteredNotes,
}) {
  return (
    <View style={{ flex: 1 }}>
      {tasks.length === 0 && <NoTaskFound />}
      {tasks && (
        <View style={{ flex: 1 }}>
          <TaskFlatList
            scrolling={scrolling}
            tasks={filteredNotes}
            renderItem={({ item }) => {
              if (
                item &&
                item.completed == false &&
                item.trash == false &&
                item.date === new Date().toString().slice(0, 15)
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
        </View>
      )}
    </View>
  );
}

export default PendingTasksScreen;
