import React, { useState, useRef, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import DeletedTasksScreen from "../screens/DeletedTasksScreen";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function StackNavigation(props) {
  const [tasks, setTasks] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    setFilteredNotes(tasks);
  }, [tasks]);

  const addTask = async (task) => {
    try {
      const newTasks = [...tasks, task];
      await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const newTasks = tasks.filter((task) => task.id !== taskId);
      await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllTasks = async () => {
    try {
      // Retrieve the current tasks array from AsyncStorage
      const tasksString = await AsyncStorage.getItem("tasks");
      const tasks = JSON.parse(tasksString) || [];

      // Filter the array to keep only the tasks where trash == false
      const filteredTasks = tasks.filter((task) => !task.trash);

      // Store the filtered array back into AsyncStorage
      await AsyncStorage.setItem("tasks", JSON.stringify(filteredTasks));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await AsyncStorage.getItem("tasks");
        if (tasks !== null) {
          setTasks(JSON.parse(tasks));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, []);

  const updateTask = async (task) => {
    try {
      const newTasks = tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      });
      await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id) => {
    const allitems = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
          completedOn: new Date().toISOString().slice(0, 10),
        };
      }
      return item;
    });
    setTasks(allitems);
    await AsyncStorage.setItem("tasks", JSON.stringify(allitems));
  };

  const moveToTrashBin = async (id) => {
    const allitems = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, trash: !item.trash };
      }
      return item;
    });
    setTasks(allitems);
    await AsyncStorage.setItem("tasks", JSON.stringify(allitems));
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
              addTask={addTask}
              tasks={tasks}
              setTasks={setTasks}
              updateStatus={updateStatus}
              moveToTrashBin={moveToTrashBin}
              deleteTask={deleteTask}
              filteredNotes={filteredNotes}
              setFilteredNotes={setFilteredNotes}
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
              deleteAllTasks={deleteAllTasks}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
