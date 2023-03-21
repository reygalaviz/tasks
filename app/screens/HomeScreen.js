import "react-native-gesture-handler";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import AddTaskScreen from "./AddTaskScreen";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import SettingsScreen from "./SettingsScreen";
import AddTaskButton from "../components/AddTaskButton";
import { useDeviceTheme } from "../theme/deviceTheme";
import AnimatedHeader from "../components/AnimatedHeader";

function HomeScreen({ navigation, ...props }) {
  //add-screen-modal
  const sheetRef = useRef();
  const snapPoints = ["100%"];
  const [isOpen, setIsOpen] = useState(false);

  const onOpenAddTask = () => {
    sheetRef.current?.expand();
  };
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(!isOpen);
  }, []);

  //recoil
  const todoList = useRecoilValue(todoItem);
  const [mode, setMode] = useState(false);

  //settings screen
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const sheetSettingsRef = useRef();
  const onOpenSettings = () => {
    sheetSettingsRef.current?.expand();
  };

  const flatListRef = useRef(null);

  const theme = useDeviceTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AnimatedHeader
        tasks={props.tasks}
        setTasks={props.setTasks}
        filteredNotes={props.filteredNotes}
        setFilteredNotes={props.setFilteredNotes}
        updateStatus={props.updateStatus}
        moveToTrashBin={props.moveToTrashBin}
        flatListRef={flatListRef}
        onOpenSettings={onOpenSettings}
      />

      <SettingsScreen
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
        sheetRef={sheetSettingsRef}
      />
      <AddTaskScreen
        addTask={props.addTask}
        tasks={props.tasks}
        snapPoints={snapPoints}
        sheetRef={sheetRef}
        onOpenAddTask={onOpenAddTask}
        handleSnapPress={handleSnapPress}
        flatListRef={flatListRef}
      />
      <AddTaskButton onOpenAddTask={onOpenAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
