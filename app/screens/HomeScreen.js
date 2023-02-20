import "react-native-gesture-handler";
import React, { useState, useContext, useCallback, useRef } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import Greeting from "../components/Greeting";
import TaskFlatList from "../components/TaskFlatList";
import AddTaskScreen from "./AddTaskScreen";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import SettingsScreen from "./SettingsScreen";
import NotificationsButton from "../components/NotificationsButton";
import SettingsButton from "../components/SettingsButton";
import themeContext from "../theme/themeContext";
import Animated, {
  SlideInDown,
  SlideInUp,
  FadeInUp,
} from "react-native-reanimated";
import CustomInput from "../components/CustomInput";
import TabBar from "../components/TabBar";

function HomeScreen(props) {
  const theme = useContext(themeContext);

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
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <HeaderBar>
          <NotificationsButton />
          <SettingsButton onOpenSettings={onOpenSettings} />
        </HeaderBar>

        <Greeting />
        {/* <View style={{ marginHorizontal: constants.m }}>
          <CustomInput />
        </View> */}

        <TabBar />

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
  },
});

export default HomeScreen;
