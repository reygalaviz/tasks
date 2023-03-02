import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import AddTaskScreen from "../screens/AddTaskScreen";

const Stack = createNativeStackNavigator();

function StackNavigation(props) {
  const [tasks, setTasks] = useState([]);
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
            <HomeScreen {...props} tasks={tasks} setTasks={setTasks} />
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
            <TaskDetailsScreen {...props} tasks={tasks} setTasks={setTasks} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
