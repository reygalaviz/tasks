import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useSetRecoilState, useRecoilState } from "recoil";
import { todoItem } from "../recoil/atom/todoItem";
import PriorityBar from "../components/PriorityBar";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";
import moment from "moment";
import ColorBar from "../components/ColorBar";
import constants from "../constants/constants";
import AddTaskButton from "../components/AddTaskButton";
import ModalSheet from "../components/ModalSheet";
import { Ionicons } from "@expo/vector-icons";
import ModalSheetHeader from "../components/ModalSheetHeader";

function AddTaskScreen({ addTask }) {
  let defaultDate = new Date();
  let defaultTime = new Date(Date.now());
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date(defaultDate));
  const [time, setTime] = useState(moment(defaultTime));
  const [priority, setPriority] = useState("");
  const [color, setColor] = useState("");

  const sheetRef = useRef();
  const snapPoints = ["90%"];
  const [isOpen, setIsOpen] = useState(false);

  const onOpenAddTask = () => {
    sheetRef.current?.expand();
  };
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(!isOpen);
  }, []);

  const onCancelPress = () => {
    sheetRef?.current?.close();
  };

  const setToDoList = useSetRecoilState(todoItem);

  const addToDo = () => {
    if (task && date && time && priority && color) {
      setToDoList((oldList) => [
        ...oldList,
        {
          name: task,
          date: date,
          time: time,
          priority: priority,
          color: color,
          completed: false,
        },
      ]);
      setTask("");
      setDate(defaultDate);
      setTime(defaultTime);
      setPriority(0), setColor(0);
      sheetRef?.current?.close();
    }
  };

  const handleAddTask = (e) => {
    console.log(priority);
    addTask({
      name: task,
      priority: priority,
      color: color,
      completed: false,
      id: Date.now(),
    });
    setTask("");
    setDate(defaultDate);
    setTime(defaultTime);
    setPriority(""), setColor("");
    sheetRef?.current?.close();
  };

  return (
    <>
      <AddTaskButton onOpenAddTask={onOpenAddTask} />
      <ModalSheet
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        onChange={handleSnapPress}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("dismissed");
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.container}>
              <ModalSheetHeader
                title="Create your task"
                onPress={onCancelPress}
              />
              <CustomInput
                placeholder="Write your task"
                value={task}
                setValue={(value) => setTask(value)}
              />

              <DatePicker
                date={date}
                setDate={setDate}
                defaultDate={defaultDate}
                onDateChange={(date) => console.log(date)}
              />
              <TimePicker
                time={time}
                setTime={setTime}
                defaultTime={defaultTime}
                onTimeChange={(time) => console.log(time)}
              />

              <PriorityBar
                priority={priority}
                setPriority={setPriority}
                buttons={["High", "Medium", "Low"]}
              />
              <ColorBar color={color} setColor={setColor} />
              <CustomButton
                onPress={handleAddTask}
                title="Submit"
                style={[styles.button]}
              />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ModalSheet>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: constants.m,
    paddingTop: constants.s,
  },

  date: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  time: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
export default AddTaskScreen;