import React from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import TaskFlatList from "../components/TaskFlatList";
import TaskCard from "../components/TaskCard";
import CompletedTaskCardContent from "../components/CompletedTaskCardContent";

function UpcomingTasksScreen({ tasks, setTasks, updateStatus, deleteTask }) {
  return (
    <View style={{ fleX: 1 }}>
      <Text>Completed</Text>

      {tasks && (
        <TaskFlatList
          tasks={tasks}
          renderItem={({ item }) => {
            if (item && item.completed == true)
              return (
                <CompletedTaskCardContent
                  task={item}
                  updateStatus={updateStatus}
                  deleteTask={deleteTask}
                />
              );
          }}
        />
      )}
    </View>
  );
}

export default UpcomingTasksScreen;
