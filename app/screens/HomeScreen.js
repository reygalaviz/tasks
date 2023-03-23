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
import OnBoarding from "../components/OnBoarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation, ...props }) {
  const flatListRef = useRef(null);
  const theme = useDeviceTheme();
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

  //on-boarding screens
  const [showOnboarding, setShowOnboarding] = useState(false);
  const onDone = () => {
    setShowOnboarding(false);
  };
  const onSkip = () => {
    setShowOnboarding(false);
  };
  useEffect(() => {
    // Check if the user has completed the onboarding
    AsyncStorage.getItem("hasCompletedOnboarding").then((value) => {
      if (value === null) {
        setShowOnboarding(true);
        AsyncStorage.setItem("hasCompletedOnboarding", "true");
      }
    });
  }, []);

  return (
    <>
      {showOnboarding ? (
        <OnBoarding onDone={onDone} onSkip={onSkip} />
      ) : (
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
