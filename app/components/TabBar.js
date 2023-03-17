import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import constants from "../constants/constants";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useDeviceTheme } from "../theme/deviceTheme";

import PendingTasksScreen from "../screens/PendingTasksScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import UpcomingTasksScreen from "../screens/UpcomingTasksScreen";
import TasksTypeFilter from "./TasksTypeFilter";
import TasksColorFilter from "./TasksColorFilter";
import TasksSortByFilter from "./TasksSortByFilter";
import TasksPriorityFilter from "./TasksPriorityFilter";

function TabBar({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  search,
  setSearch,
  deleteTask,
  filteredNotes,
  setFilteredNotes,
  onscroll,
  flatListRef,
}) {
  const tabs = ["", "Today", "Colors", "Priority", "Sort by"];
  const theme = useDeviceTheme();

  const [selectedTab, setSelectedTab] = useState(tabs[1]);

  const [activeColorTab, setActiveColorTab] = useState(0);
  const [activePTab, setActivePTab] = useState(0);

  const [filterTab, setFilterTab] = useState("Today");
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

  const filterSheetRef = useRef();
  const filterModal = () => {
    filterSheetRef.current.open();
  };
  const today = new Date().toISOString().slice(0, 10);
  const tasksToday = filteredNotes.filter((item) => {
    return (
      item.date.slice(0, 10) === today &&
      item.completed == false &&
      item.trash == false
    );
  });

  const futureTasks = filteredNotes.filter((item) => {
    return (
      item.date.slice(0, 10) !== today &&
      item.completed == false &&
      item.trash == false
    );
  });
  const completedTasks = filteredNotes.filter((item) => {
    return item.completed == true && item.trash == false;
  });

  const colorSheetRef = useRef();
  const colorModal = () => {
    colorSheetRef.current.open();
  };

  const pSheetRef = useRef();
  const priorityModal = () => {
    pSheetRef.current.open();
  };

  const sortBySheetRef = useRef();
  const sortByModal = () => {
    sortBySheetRef.current.open();
  };

  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }, [index]);
  return (
    <>
      <TasksTypeFilter
        filterTab={filterTab}
        setFilterTab={setFilterTab}
        setSelectedTab={setSelectedTab}
        filterModal={filterModal}
        filterSheetRef={filterSheetRef}
        tasksToday={tasksToday}
        futureTasks={futureTasks}
        completedTasks={completedTasks}
      />

      <TasksColorFilter
        colorSheetRef={colorSheetRef}
        tasks={tasks}
        colorsPicked={colorsPicked}
        setColorsPicked={setColorsPicked}
        filterNotes={filterNotes}
        setTasks={setTasks}
        setActiveColorTab={setActiveColorTab}
      />

      <TasksPriorityFilter
        pSheetRef={pSheetRef}
        priorityPicked={priorityPicked}
        setPriorityPicked={setPriorityPicked}
        filterNotes={filterNotes}
        tasks={tasks}
        setTasks={setTasks}
        setActivePTab={setActivePTab}
      />

      <TasksSortByFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortByModal={sortByModal}
        sortBySheetRef={sortBySheetRef}
      />

      <FlatList
        ref={ref}
        initialScrollIndex={index}
        decelerationRate="fast"
        data={tabs}
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          paddingHorizontal: constants.m,
          marginTop: constants.xs,
          marginBottom: constants.m,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: tab, index }) => {
          return (
            <Pressable
              index={index}
              style={[
                styles.container,
                index === 1
                  ? { backgroundColor: theme.filterActiveButton }
                  : index === 2 && activeColorTab == true
                  ? { backgroundColor: theme.filterActiveButton }
                  : index === 3 && activePTab == true
                  ? { backgroundColor: theme.filterActiveButton }
                  : { backgroundColor: theme.filterInActiveButton },

                ,
              ]}
              onPress={() => {
                setIndex(index);
                {
                  index === 0 ? filterModal() : null;
                }
                {
                  index === 2 ? colorModal() : null;
                }
                {
                  index === 3 ? priorityModal() : null;
                }
              }}
            >
              {index === 0 ? (
                <Ionicons name="ios-options" size={24} color={theme.color} />
              ) : index !== 0 && index !== 1 ? (
                <View style={[styles.fTabs]}>
                  <Text
                    style={[
                      styles.text,

                      {
                        color:
                          index === 2 && activeColorTab == true
                            ? theme.background
                            : index == 3 && activePTab == true
                            ? theme.background
                            : theme.color,
                      },
                    ]}
                  >
                    {index !== 1 ? tab : selectedTab}
                  </Text>
                  <Entypo
                    name="chevron-small-down"
                    size={24}
                    color={
                      index === 2 && activeColorTab == true
                        ? theme.background
                        : index == 3 && activePTab == true
                        ? theme.background
                        : theme.color
                    }
                  />
                </View>
              ) : (
                <Text
                  style={[
                    styles.text,
                    {
                      color: index !== 1 ? theme.color : theme.background,
                    },
                  ]}
                >
                  {index !== 1 ? tab : selectedTab}
                </Text>
              )}
            </Pressable>
          );
        }}
      />

      {selectedTab === "Today" && (
        <PendingTasksScreen
          search={search}
          setSearch={setSearch}
          tasks={tasks}
          tasksToday={tasksToday}
          setTasks={setTasks}
          updateStatus={updateStatus}
          moveToTrashBin={moveToTrashBin}
          deleteTask={deleteTask}
          onscroll={onscroll}
          flatListRef={flatListRef}
        />
      )}

      {selectedTab === "Upcoming" && (
        <UpcomingTasksScreen
          search={search}
          setSearch={setSearch}
          tasks={tasks}
          futureTasks={futureTasks}
          setTasks={setTasks}
          updateStatus={updateStatus}
          moveToTrashBin={moveToTrashBin}
          deleteTask={deleteTask}
        />
      )}

      {selectedTab === "Completed" && (
        <CompletedTasksScreen
          search={search}
          setSearch={setSearch}
          completedTasks={completedTasks}
          tasks={tasks}
          setTasks={setTasks}
          updateStatus={updateStatus}
          moveToTrashBin={moveToTrashBin}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: constants.m,
    paddingVertical: constants.s,
    marginRight: constants.s,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: constants.tabText,
  },
  fTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default TabBar;
