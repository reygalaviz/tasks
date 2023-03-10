import React, { useState, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import DeletedTasksScreen from "../screens/DeletedTasksScreen";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

enableScreens();

const Stack = createNativeStackNavigator();

function StackNavigation(props) {
  const [tasks, setTasks] = useState([]);
  const tabs = ["Today", "Upcoming", "Completed"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

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
              date: task.date,
              time: task.time,
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
    <NavigationContainer>
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
              tabs={tabs}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="DetailsScreen">
          {(props) => (
            <TaskDetailsScreen
              {...props}
              tasks={tasks}
              setTasks={setTasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
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
    </NavigationContainer>
  );
}

export default StackNavigation;
