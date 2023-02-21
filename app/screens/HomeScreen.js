import "react-native-gesture-handler";
import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import { EventRegister } from "react-native-event-listeners";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import Greeting from "../components/Greeting";
import TaskFlatList from "../components/TaskFlatList";
import AddTaskScreen from "./AddTaskScreen";
import { useRecoilValue } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import SettingsScreen from "./SettingsScreen";
import NotificationsButton from "../components/NotificationsButton";
import SettingsButton from "../components/SettingsButton";
import themeContext from "../theme/themeContext";
import Animated, {
  SlideInDown,
  SlideInUp,
  FadeInUp,
  withDecay,
} from "react-native-reanimated";
import TabBar from "../components/TabBar";

function HomeScreen({ navigation }) {
  const theme = useContext(themeContext);

  const todoList = useRecoilValue(todoItem);
  const [mode, setMode] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const sheetSettingsRef = useRef();
  const onOpenSettings = () => {
    sheetSettingsRef.current?.expand();
  };

  const OnCalendarPress = () => {
    navigation.navigate("CalendarScreen");
  };

  const [tasks, setTasks] = useState([]);
  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const scrolling = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrolling, 0, 100);
  const translation = Animated.interpolateNode(diffClamp, {
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  const headermax = 150;
  const headermin = 50;

  const animatedHeaderHeight = scrolling.interpolate({
    inputRange: [0, headermax - headermin],
    outputRange: [headermax, headermin],
    extrapolate: "clamp",
  });

  return (
    <>
      <StatusBar barStyle={mode === false ? "dark-content" : "light-content"} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <HeaderBar reminder>
          <NotificationsButton />
          <SettingsButton onOpenSettings={onOpenSettings} />
        </HeaderBar>
        <Greeting OnCalendarPress={OnCalendarPress} />
        <TabBar />

        {tasks && <TaskFlatList tasks={tasks} scrolling={scrolling} />}

        <AddTaskScreen addTask={addTask} />
        <SettingsScreen
          isOpen={isSettingsOpen}
          setIsOpen={setIsSettingsOpen}
          sheetRef={sheetSettingsRef}
          mode={mode}
          setMode={setMode}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
