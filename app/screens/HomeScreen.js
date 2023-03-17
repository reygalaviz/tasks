import "react-native-gesture-handler";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import AddTaskScreen from "./AddTaskScreen";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import SettingsScreen from "./SettingsScreen";
import NotificationsButton from "../components/NotificationsButton";
import SettingsButton from "../components/SettingsButton";
import AddTaskButton from "../components/AddTaskButton";
import TabBar from "../components/TabBar";
import CustomInput from "../components/CustomInput";
import { theme } from "../theme/theme";
import { useDeviceTheme } from "../theme/deviceTheme";

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

  //search
  const [search, setSearch] = useState("");

  //settings screen
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const sheetSettingsRef = useRef();
  const onOpenSettings = () => {
    sheetSettingsRef.current?.expand();
  };

  const handleScroll = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  };
  const flatListRef = useRef(null);

  const theme = useDeviceTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ paddingHorizontal: constants.m }}>
        <HeaderBar date>
          <NotificationsButton
            onOpenNotifications={() => console.log(props.tasks)}
          />
          <SettingsButton onOpenSettings={onOpenSettings} />
        </HeaderBar>
        <CustomInput
          style={{ marginVertical: constants.s }}
          textStyle={{
            height: 20,
            fontSize: constants.searchFontSize,
            fontWeight: "600",
          }}
          placeholder="Search Notes"
          value={search}
          setValue={(value) => setSearch(value)}
          numberOfLines={1}
          maxLength={50}
          multiline={false}
        />
      </View>

      <TabBar
        search={search}
        setSearch={setSearch}
        tasks={props.tasks}
        setTasks={props.setTasks}
        updateStatus={props.updateStatus}
        moveToTrashBin={props.moveToTrashBin}
        deleteTask={props.deleteTask}
        filteredNotes={props.filteredNotes}
        setFilteredNotes={props.setFilteredNotes}
        onscroll={handleScroll}
        flatListRef={flatListRef}
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
