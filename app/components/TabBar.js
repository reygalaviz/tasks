import React, { useState, useContext } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import themeContext from "../theme/themeContext";
import constants from "../constants/constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import PendingTasksScreen from "../screens/PendingTasksScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import UpcomingTasksScreen from "../screens/UpcomingTasksScreen";

const tabs = ["Today", "Upcoming", "Completed"];

function TabBar({ tasks, setTasks, deleteTask, updateStatus, moveToTrashBin }) {
  const Tab = createMaterialTopTabNavigator();
  const theme = useContext(themeContext);

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [dataList, setDataList] = useState(tasks);
  const setStatusTab = (selectedTab) => {
    if (selectedTab !== "Today") {
      setDataList([...tasks.filter((e) => e.completed == selectedTab)]);
    } else {
      setDataList(tasks);
    }
    setSelectedTab(selectedTab);
  };

  return (
    <Tab.Navigator
      style={{ marginTop: constants.s }}
      screenOptions={{
        tabBarIndicator: () => null,
        tabBarInactiveTintColor: theme.inactiveTabColor,
        tabBarActiveTintColor: theme.activeTabColor,
        tabBarContentContainerStyle: {
          borderRadius: 10,
          justifyContent: "space-between",
        },
        tabBarStyle: {
          marginHorizontal: constants.m,
          borderRadius: 10,
          backgroundColor: "transparent",
        },
        tabBarItemStyle: {
          alignItems: "center",
          borderRadius: 20,
        },
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: constants.tabText,
        },
      }}
      sceneContainerStyle={{ backgroundColor: theme.background }}
    >
      <Tab.Screen name="Today">
        {(props) => (
          <PendingTasksScreen
            {...props}
            tasks={tasks}
            setTasks={setTasks}
            deleteTask={deleteTask}
            updateStatus={updateStatus}
            moveToTrashBin={moveToTrashBin}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Upcoming" component={UpcomingTasksScreen} />
      <Tab.Screen name="Completed">
        {(props) => (
          <CompletedTasksScreen
            {...props}
            tasks={tasks}
            setTasks={setTasks}
            deleteTask={deleteTask}
            updateStatus={updateStatus}
            moveToTrashBin={moveToTrashBin}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>

    // <View
    //   style={{
    //     alignItems: "center",
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     paddingHorizontal: constants.m,
    //     marginTop: constants.m,
    //     marginBottom: constants.s,
    //   }}
    // >
    //   {tabs.map((tab, index) => {
    //     return (
    //       <Pressable onPress={() => setSelectedTab(tab)} key={index}>
    //         <View
    //           style={[
    //             styles.container,
    //             {
    //               backgroundColor:
    //                 selectedTab === tab ? theme.buttonColor : null,
    //             },
    //           ]}
    //         >
    //           <Text
    //             style={[
    //               styles.text,
    //               {
    //                 color: selectedTab === tab ? theme.buttonText : theme.color,
    //               },
    //             ]}
    //           >
    //             {tab}
    //           </Text>
    //         </View>
    //       </Pressable>
    //     );
    //   })}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: constants.s,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: constants.tabWidth,
    height: constants.tabHeight,
  },
  text: {
    fontWeight: "700",
    fontSize: constants.tabText,
  },
});

export default TabBar;
