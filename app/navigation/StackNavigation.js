import React, { useState, useCallback, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import DeletedTasksScreen from "../screens/DeletedTasksScreen";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function StackNavigation(props) {
  const [tasks, setTasks] = useState([]);

  // const addTask = (task) => {
  //   setTasks((prev) => [...prev, task]);
  // };
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
  // const deleteTask = useCallback((id) => {
  //   setTasks((prev) => prev.filter((t) => t.id !== id));
  // });
  // const updateTask = (task) => {
  //   setTasks((prev) =>
  //     prev.map((t) =>
  //       t.id === task.id
  //         ? {
  //             ...t,
  //             name: task.name,
  //             details: task.details,
  //             date: task.date,
  //             time: task.time,
  //             priority: task.priority,
  //             color: task.color,
  //           }
  //         : t
  //     )
  //   );
  // };

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
              addTask={addTask}
              tasks={tasks}
              setTasks={setTasks}
              updateStatus={updateStatus}
              moveToTrashBin={moveToTrashBin}
              deleteTask={deleteTask}
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
