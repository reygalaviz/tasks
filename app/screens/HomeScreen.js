import "react-native-gesture-handler";
import React, { useState, useContext, useSharedValue, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import Greeting from "../components/Greeting";
import AddTaskScreen from "./AddTaskScreen";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import SettingsScreen from "./SettingsScreen";
import NotificationsButton from "../components/NotificationsButton";
import SettingsButton from "../components/SettingsButton";
import themeContext from "../theme/themeContext";
import Animated from "react-native-reanimated";
import TabBar from "../components/TabBar";
import CustomInput from "../components/CustomInput";

function HomeScreen({ navigation, ...props }) {
  const theme = useContext(themeContext);

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

  //animated header
  const scrolling = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrolling, 0, 100);
  const translation = Animated.interpolateNode(diffClamp, {
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  const startHeaderHeight = constants.startHeaderHeight;
  const endHeaderHeight = constants.endHeaderHeight;

  const animatedHeaderHeight = scrolling.interpolate({
    inputRange: [0, 50],
    outputRange: [startHeaderHeight, endHeaderHeight],
    extrapolate: "clamp",
  });

  return (
    <>
      <StatusBar barStyle={mode === false ? "dark-content" : "light-content"} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={{ paddingHorizontal: constants.m }}>
          <HeaderBar reminder>
            <NotificationsButton />
            <SettingsButton onOpenSettings={onOpenSettings} />
          </HeaderBar>
          <Greeting OnCalendarPress={() => console.log(props.tasks)} />

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
          deleteTask={props.deleteTask}
          updateStatus={props.updateStatus}
          moveToTrashBin={props.moveToTrashBin}
          tabs={props.tabs}
          selectedTab={props.selectedTab}
          setSelectedTab={props.setSelectedTab}
          scrolling={scrolling}
        />
        <AddTaskScreen
          addTask={props.addTask}
          tabs={props.tabs}
          selectedTab={props.selectedTab}
          setSelectedTab={props.setSelectedTab}
        />
        <SettingsScreen
          isOpen={isSettingsOpen}
          setIsOpen={setIsSettingsOpen}
          sheetRef={sheetSettingsRef}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default HomeScreen;
