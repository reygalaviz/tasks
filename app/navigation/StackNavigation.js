import React, { useState, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import DeletedTasksScreen from "../screens/DeletedTasksScreen";

const Stack = createNativeStackNavigator();

function StackNavigation(props) {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  });
  const updateTask = (task) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? {
              ...t,
              name: task.name,
              details: task.details,
              priority: task.priority,
              color: task.color,
            }
          : t
      )
    );
  };

  const updateStatus = (id, newStatus) => {
    let allItems = tasks;
    allItems = allItems.map((item) => {
      if (item.id === id) {
        item.completed = newStatus;
      }
      return item;
    });
    setTasks(allItems);
  };

  const moveToTrashBin = (id, newStatus) => {
    let allItems = tasks;
    allItems = allItems.map((item) => {
      if (item.id === id) {
        item.trash = newStatus;
      }
      return item;
    });
    setTasks(allItems);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen">
        {(props) => (
          <HomeScreen
            {...props}
            tasks={tasks}
            setTasks={setTasks}
            deleteTask={deleteTask}
            addTask={addTask}
            updateStatus={updateStatus}
            moveToTrashBin={moveToTrashBin}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="DetailsScreen">
        {(props) => (
          <TaskDetailsScreen
            {...props}
            tasks={tasks}
            setTasks={setTasks}
            updateTask={updateTask}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="DeletedTasksScreen">
        {(props) => (
          <DeletedTasksScreen
            {...props}
            tasks={tasks}
            setTasks={setTasks}
            moveToTrashBin={moveToTrashBin}
            deleteTask={deleteTask}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default StackNavigation;
