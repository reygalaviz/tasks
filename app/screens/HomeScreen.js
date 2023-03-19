import "react-native-gesture-handler";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  Animated,
  Text,
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
import PendingTasksScreen from "./PendingTasksScreen";
import UpcomingTasksScreen from "./UpcomingTasksScreen";
import CompletedTasksScreen from "./CompletedTasksScreen";
import FilterTabBar from "../components/FilterTabBar";

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

  //tab-info
  const [activeTab, setActiveTab] = useState(0);

  const renderScreen = (index, props) => {
    switch (index) {
      case 0:
        return <PendingTasksScreen {...props} scrollY={props.scrollY} />;
      case 1:
        return <UpcomingTasksScreen {...props} />;
      case 2:
        return <CompletedTasksScreen {...props} />;
      case 3:
        return <CompletedTasksScreen {...props} />;
      default:
        return null;
    }
  };

  const [colorsPicked, setColorsPicked] = useState([]);
  const [sortBy, setSortBy] = useState(0);
  const [priorityPicked, setPriorityPicked] = useState([]);

  const filterNotes = () => {
    const filtered = props.tasks.filter((task) => {
      const nameMatch = task.name.toLowerCase().includes(search.toLowerCase());
      const colorMatch =
        colorsPicked.length > 0 ? colorsPicked.includes(task.color) : task;
      const priorityMatch =
        priorityPicked.length > 0
          ? priorityPicked.includes(task.priority)
          : task;
      return nameMatch && colorMatch && priorityMatch;
    });
    props.setFilteredNotes(filtered);
  };

  useEffect(() => {
    filterNotes();
  }, [search]);

  const today = new Date().toISOString().slice(0, 10);
  const tasksToday = props.filteredNotes.filter((item) => {
    return (
      item.date.slice(0, 10) === today &&
      item.completed == false &&
      item.trash == false
    );
  });

  const futureTasks = props.filteredNotes.filter((item) => {
    return (
      item.date.slice(0, 10) !== today &&
      item.completed == false &&
      item.trash == false
    );
  });
  const completedTasks = props.filteredNotes.filter((item) => {
    return item.completed == true && item.trash == false;
  });

  //animated-header
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const HEADER_HEIGHT = Platform.OS === "ios" ? constants.headerHeight : 120;
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0; // Optional chaining is used to prevent errors if StatusBar.currentHeight is null
  const headerHeight = HEADER_HEIGHT + STATUS_BAR_HEIGHT;

  const scrollYClamped = Animated.diffClamp(scrollY, 0, headerHeight);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, headerHeight * 0.55],
    outputRange: [0, -headerHeight * 0.55],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const topComponentsOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight - 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslate }],
            height: headerHeight,
            backgroundColor: theme.background,
            // opacity: headerOpacity,
          },
        ]}
      >
        <View style={{ width: "100%" }}>
          <Animated.View style={{ opacity: topComponentsOpacity }}>
            <HeaderBar date>
              <NotificationsButton
                onOpenNotifications={() => console.log(props.tasks)}
              />
              <SettingsButton onOpenSettings={onOpenSettings} />
            </HeaderBar>
          </Animated.View>
          <Animated.View style={{ opacity: topComponentsOpacity }}>
            <TabBar
              setActiveTabb={setActiveTab}
              futureTasks={futureTasks}
              completedTasks={completedTasks}
              tasksToday={tasksToday}
            />
          </Animated.View>
        </View>
        <View style={{ paddingHorizontal: constants.m }}>
          <CustomInput
            style={{
              marginVertical: constants.s,
            }}
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

        <FilterTabBar
          tasks={props.tasks}
          setTasks={props.setTasks}
          filterNotes={filterNotes}
          colorsPicked={colorsPicked}
          setColorsPicked={setColorsPicked}
          priorityPicked={priorityPicked}
          setPriorityPicked={setPriorityPicked}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </Animated.View>
      {renderScreen(activeTab, {
        updateStatus: props.updateStatus,
        moveToTrashBin: props.moveToTrashBin,
        tasksToday: tasksToday,
        futureTasks: futureTasks,
        completedTasks: completedTasks,
        scrollY: scrollY,
        flatListRef: flatListRef,
      })}

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
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1000,
  },
});

export default HomeScreen;
