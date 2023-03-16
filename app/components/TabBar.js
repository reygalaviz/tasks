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
import { getTheme } from "../theme/theme";
import { Entypo } from "@expo/vector-icons";

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
  const theme = getTheme(useColorScheme());
  const tabs = ["", "Today", "Colors", "Priority", "Sort by"];

  const [selectedTab, setSelectedTab] = useState(tabs[1]);

  const [activeColorTab, setActiveColorTab] = useState(0);
  const [activePTab, setActivePTab] = useState(0);

  const [filterTab, setFilterTab] = useState("Today");
  const [colorsPicked, setColorsPicked] = useState([]);
  const [sortBy, setSortBy] = useState(0);
  const [priorityPicked, setPriorityPicked] = useState();

  const filterNotes = () => {
    const filtered = tasks.filter((task) => {
      const nameMatch = task.name.toLowerCase().includes(search.toLowerCase());
      const colorMatch =
        colorsPicked.length > 0 ? colorsPicked.includes(task.color) : task;
      const priorityMatch = priorityPicked
        ? priorityPicked === task.priority
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
                  ? { backgroundColor: theme.color }
                  : index === 2 && activeColorTab == true
                  ? { backgroundColor: theme.color }
                  : index === 3 && activePTab == true
                  ? { backgroundColor: theme.color }
                  : { backgroundColor: theme.textBoxBGColor },

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
                <Image
                  source={require("../../assets/filter.png")}
                  style={{
                    width: constants.iconTabSizeW,
                    height: constants.iconTabSizeH,
                  }}
                />
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
          filteredNotes={filteredNotes}
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
          filteredNotes={filteredNotes}
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
          filteredNotes={filteredNotes}
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
