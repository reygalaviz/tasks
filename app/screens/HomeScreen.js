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
import constants from "../constants/constants";
import Greeting from "../components/Greeting";
import TaskFlatList from "../components/TaskFlatList";
import AddTaskScreen from "./AddTaskScreen";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import SettingsScreen from "./SettingsScreen";
import NotificationsButton from "../components/NotificationsButton";
import SettingsButton from "../components/SettingsButton";

function HomeScreen(props) {
  const todoList = useRecoilValue(todoItem);
  const [mode, setMode] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const sheetSettingsRef = useRef();

  const onOpenSettings = () => {
    sheetSettingsRef.current?.expand();
  };

  const [tasks, setTasks] = useState([]);
  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <>
      <StatusBar barStyle={mode === false ? "dark-content" : "light-content"} />
      <View style={styles.container}>
        <TabBar>
          <NotificationsButton on />
          <SettingsButton onOpenSettings={onOpenSettings} />
        </TabBar>
        <Greeting />
        <AddTaskScreen addTask={addTask} />
        {tasks && <TaskFlatList tasks={tasks} />}
        <SettingsScreen
          isOpen={isSettingsOpen}
          setIsOpen={setIsSettingsOpen}
          sheetRef={sheetSettingsRef}
          mode={mode}
          setMode={setMode}
        />
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
