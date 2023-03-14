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

import PendingTasksScreen from "../screens/PendingTasksScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import UpcomingTasksScreen from "../screens/UpcomingTasksScreen";
import TasksTypeFilter from "./TasksTypeFilter";
import TasksColorFilter from "./TasksColorFilter";
import TasksSortByFilter from "./TasksSortByFilter";

function TabBar({
  tasks,
  setTasks,
  updateStatus,
  moveToTrashBin,
  scrolling,
  search,
  setSearch,
  deleteTask,
}) {
  const theme = getTheme(useColorScheme());
  const tabs = ["filter", "Today", "Colors", "Sort by"];
  const [selectedTab, setSelectedTab] = useState(tabs[1]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(() => {
    setFilteredNotes(tasks);
  }, [tasks]);

  const [filterTab, setFilterTab] = useState(0);
  const [colorsPicked, setColorsPicked] = useState([]);
  const [sortBy, setSortBy] = useState(0);

  const filterNotes = () => {
    const filtered = tasks.filter((task) => {
      const nameMatch = task.name.toLowerCase().includes(search.toLowerCase());
      const colorMatch =
        colorsPicked.length > 0 ? colorsPicked.includes(task.color) : task;
      return nameMatch && colorMatch;
    });
    setFilteredNotes(filtered);
  };
  useEffect(() => {
    filterNotes();
  }, [search, colorsPicked]);

  const colorSheetRef = useRef();
  const colorModal = () => {
    colorSheetRef.current.open();
  };

  const filterSheetRef = useRef();
  const filterModal = () => {
    filterSheetRef.current.open();
  };

  const sortBySheetRef = useRef();
  const sortByModal = () => {
    sortBySheetRef.current.open();
  };

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
      />

      <TasksSortByFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortByModal={sortByModal}
        sortBySheetRef={sortBySheetRef}
      />

      <FlatList
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
                {
                  backgroundColor:
                    index !== 1 ? theme.textBoxBGColor : theme.color,
                },
              ]}
              onPress={() => {
                {
                  index === 0 ? filterModal() : null;
                }
                {
                  index === 2 ? colorModal() : null;
                }
                {
                  index === 3 ? sortByModal() : null;
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
          scrolling={scrolling}
          deleteTask={deleteTask}
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
          scrolling={scrolling}
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
});

export default TabBar;
