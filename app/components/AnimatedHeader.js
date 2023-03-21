import "react-native-gesture-handler";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Animated,
  TouchableOpacity,
} from "react-native";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import NotificationsButton from "../components/NotificationsButton";
import SettingsButton from "../components/SettingsButton";
import TabBar from "../components/TabBar";
import CustomInput from "../components/CustomInput";
import { theme } from "../theme/theme";
import { useDeviceTheme } from "../theme/deviceTheme";
import FilterTabBar from "../components/FilterTabBar";
import { Entypo } from "@expo/vector-icons";

import PendingTasksScreen from "../screens/PendingTasksScreen";
import UpcomingTasksScreen from "../screens/UpcomingTasksScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import BackLogScreen from "../screens/BackLogScreen";

function AnimatedHeader({
  tasks,
  setTasks,
  filteredNotes,
  moveToTrashBin,
  updateStatus,
  flatListRef,
  setFilteredNotes,
  onOpenSettings,
}) {
  const theme = useDeviceTheme();

  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const handleChangeText = useCallback((value) => {
    setSearch(value);
  }, []);
  function handleClearText() {
    setSearch("");
    inputRef.current.focus();
  }
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
        return <BackLogScreen {...props} />;
      default:
        return null;
    }
  };

  const [colorsPicked, setColorsPicked] = useState([]);
  const [sortBy, setSortBy] = useState(0);
  const [priorityPicked, setPriorityPicked] = useState([]);

  const filterNotes = () => {
    const filtered = tasks.filter((task) => {
      const nameMatch = task.name.toLowerCase().includes(search.toLowerCase());
      const colorMatch =
        colorsPicked.length > 0 ? colorsPicked.includes(task.color) : task;
      const priorityMatch =
        priorityPicked.length > 0
          ? priorityPicked.includes(task.priority)
          : task;
      return nameMatch && colorMatch && priorityMatch;
    });
    setFilteredNotes(filtered);
  };

  useEffect(() => {
    filterNotes();
  }, [search]);

  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [backlogTasks, setBacklogTasks] = useState([]);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const now = new Date();

    const filteredTodayTasks = filteredNotes.filter((task) => {
      const taskDueDate = new Date(task.date);
      return (
        taskDueDate.toLocaleDateString() <= today &&
        !task.completed &&
        !task.trash
      );
    });

    // Filter out upcoming tasks and set them to the upcomingTasks state
    const filteredUpcomingTasks = filteredNotes.filter((task) => {
      const taskDueDate = new Date(task.date);
      return (
        taskDueDate.toLocaleDateString() > today &&
        !task.completed &&
        !task.trash
      );
    });

    // Filter out overdue tasks and set them to the backlogTasks state
    const filteredBacklogTasks = filteredNotes.filter((task) => {
      const taskDueDate = new Date(task.date);
      return (
        taskDueDate.toLocaleDateString() > today &&
        !task.completed &&
        !task.trash
      );
    });

    setTodayTasks(filteredTodayTasks);
    setUpcomingTasks(filteredUpcomingTasks);
    setBacklogTasks(filteredBacklogTasks);
  }, [filteredNotes]);

  const completedTasks = filteredNotes.filter((item) => {
    return item.completed && !item.trash;
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
    inputRange: [0, headerHeight - 180],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  return (
    <>
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
                onOpenNotifications={() => console.log(tasks)}
              />
              <SettingsButton onOpenSettings={onOpenSettings} />
            </HeaderBar>
          </Animated.View>
          <Animated.View style={{ opacity: topComponentsOpacity }}>
            <TabBar
              setActiveTabb={setActiveTab}
              upcomingTasks={upcomingTasks}
              completedTasks={completedTasks}
              todayTasks={todayTasks}
              backlogTasks={backlogTasks}
              tasks={tasks}
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
            placeholder="search tasks"
            value={search}
            setValue={handleChangeText}
            numberOfLines={1}
            maxLength={50}
            multiline={false}
          >
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={handleClearText}
            >
              {search.length > 0 && (
                <Entypo
                  name="cross"
                  size={constants.searchFontSize}
                  color={theme.placeholderColor}
                />
              )}
            </TouchableOpacity>
          </CustomInput>
        </View>

        <FilterTabBar
          tasks={tasks}
          setTasks={setTasks}
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
        updateStatus: updateStatus,
        moveToTrashBin: moveToTrashBin,
        todayTasks: todayTasks,
        setUpcomingTasks: setUpcomingTasks,
        upcomingTasks: upcomingTasks,
        completedTasks: completedTasks,
        backlogTasks: backlogTasks,
        scrollY: scrollY,
        flatListRef: flatListRef,
      })}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1000,
  },
});

export default AnimatedHeader;
