import React, { useState } from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import PendingTaskCardContent from "../components/PendingTaskCardContent";
import TaskFlatList from "../components/TaskFlatList";
import constants from "../constants/constants";
import NoTaskFound from "../components/NoTaskFound";

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
  const [today, setToday] = useState([]);
  console.log(new Date().toString().slice(0, 15));

  return (
    <View style={{ flex: 1 }}>
      <TaskFlatList
        scrolling={scrolling}
        tasks={tasks}
        renderItem={({ item }) => {
          if (
            item &&
            item.completed == false &&
            item.trash == false &&
            item.date == new Date().toString().slice(0, 15)
          ) {
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
            } else {
              return <NoTaskFound search={search} />;
            }
          }
        }}
      />
    </View>
  );
}

export default PendingTasksScreen;
