import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import TaskFlatList from "../components/TaskFlatList";
import PendingTaskCardContent from "../components/PendingTaskCardContent";
import NoTaskFound from "../components/NoTaskFound";

function UpcomingTasksScreen({
  tasks,
  setTasks,
  updateStatus,
  deleteTask,
  moveToTrashBin,
  search,
  setSearch,
}) {
  return (
    <View style={{ fleX: 1 }}>
      {tasks && (
        <TaskFlatList
          tasks={tasks}
          renderItem={({ item }) => {
            if (
              item &&
              item.completed == false &&
              item.trash == false &&
              item.date !== new Date().toString().slice(0, 15)
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
      )}
    </View>
  );
}

export default UpcomingTasksScreen;
