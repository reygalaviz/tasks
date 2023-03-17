import React, { useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { color } from "react-native-reanimated";
import NoTaskFound from "../components/NoTaskFound";
import TaskCard from "../components/TaskCard";
import TaskFlatList from "../components/TaskFlatList";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";

function PendingTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  search,
  setSearch,
  filteredNotes,
  deleteTask,
  onscroll,
  flatListRef,
}) {
  const theme = useDeviceTheme();

  const today = new Date().toString().slice(0, 15);
  const tasksToday = filteredNotes.filter((item) => {
    return (
      item.date === today && item.completed == false && item.trash == false
    );
  });

  return (
    <View style={{ flex: 1 }}>
      {tasksToday.length === 0 && <NoTaskFound message="No tasks for today" />}
      {tasksToday && (
        <View style={{ flex: 1 }}>
          <TaskFlatList
            flatListRef={flatListRef}
            oscroll={onscroll}
            tasks={tasksToday}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TaskCard
                  task={item}
                  updateStatus={() => updateStatus(item.id)}
                  handleDelete={() => moveToTrashBin(item.id)}
                  pending
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

export default PendingTasksScreen;
