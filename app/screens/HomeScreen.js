import "react-native-gesture-handler";
import React, { useState, useContext, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Switch,
  Button,
  Pressable,
} from "react-native";
import { EventRegister } from "react-native-event-listeners";
import TabBar from "../components/TabBar";
import themeContext from "../theme/themeContext";
import constants from "../constants/constants";
import Greeting from "../components/Greeting";
import AddTaskButton from "../components/AddTaskButton";
import TaskCard from "../components/TaskCard";
import TaskFlatList from "../components/TaskFlatList";
import AddTaskScreen from "./AddTaskScreen";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";

function HomeScreen(props) {
  const [mode, setMode] = useState(false);
  const theme = useContext(themeContext);
  const todoList = useRecoilValue(todoItem);

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <>
      <View style={styles.container}>
        <TabBar />
        <Greeting />
        <AddTaskScreen addTask={addTask} />
        {tasks && <TaskFlatList tasks={tasks} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: constants.m,
  },
});

export default HomeScreen;
