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

function TabBar({ tasks, setTasks, deleteTask, updateStatus }) {
  const Tab = createMaterialTopTabNavigator();
  const theme = useContext(themeContext);

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicator: () => null,
        tabBarContentContainerStyle: {
          borderRadius: 10,
        },
        tabBarStyle: {
          marginHorizontal: constants.m,
          borderRadius: 10,
        },
        tabBarItemStyle: {
          alignItems: "center",
          borderRadius: 10,
        },
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen name="Today">
        {(props) => (
          <PendingTasksScreen
            {...props}
            tasks={tasks}
            setTasks={setTasks}
            deleteTask={deleteTask}
            updateStatus={updateStatus}
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
