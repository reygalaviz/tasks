import React, { useState, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import DeletedTasksScreen from "../screens/DeletedTasksScreen";
import { NavigationContainer } from "@react-navigation/native";
import { firebase } from "../../firebaseConfig";

const Stack = createNativeStackNavigator();

function StackNavigation(props) {
  const [tasks, setTasks] = useState([]);
  const tabs = ["Today", "Upcoming", "Completed"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [completed, setCompleted] = useState();
  const [trash, setTrash] = useState();

  const updateStatus = (id, newStatus) => {
    let allItems = tasks;
    allItems = allItems.map((item) => {
      if (item.id === id) {
        firebase
          .firestore()
          .collection("tasks")
          .doc(id)
          .update({
            completed: !item.completed,
          })
          .catch((err) => {
            alert(err);
          });
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
        firebase
          .firestore()
          .collection("tasks")
          .doc(id)
          .update({
            trash: !item.trash,
          })
          .catch((err) => {
            alert(err);
          });
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
              updateStatus={updateStatus}
              moveToTrashBin={moveToTrashBin}
              tabs={tabs}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              completed={completed}
              trash={trash}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="DetailsScreen">
          {(props) => (
            <TaskDetailsScreen {...props} tasks={tasks} setTasks={setTasks} />
          )}
        </Stack.Screen>
        <Stack.Screen name="DeletedTasksScreen">
          {(props) => (
            <DeletedTasksScreen
              {...props}
              tasks={tasks}
              setTasks={setTasks}
              moveToTrashBin={moveToTrashBin}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
