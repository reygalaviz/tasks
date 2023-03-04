import React, { useState, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import DeletedTasksScreen from "../screens/DeletedTasksScreen";

const Stack = createNativeStackNavigator();

function StackNavigation(props) {
  const [tasks, setTasks] = useState([]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  });

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
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddTaskScreen">
          {(props) => (
            <AddTaskScreen {...props} tasks={tasks} setTasks={setTasks} />
          )}
        </Stack.Screen>
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="DetailsScreen">
          {(props) => (
            <TaskDetailsScreen
              {...props}
              tasks={tasks}
              setTasks={setTasks}
              deleteTask={deleteTask}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="DeletedTasksScreen"
          component={DeletedTasksScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
