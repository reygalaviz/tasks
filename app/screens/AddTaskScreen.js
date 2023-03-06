import React, { useState, useRef, useCallback, useContext } from "react";
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
import CustomDatePicker from "../components/CustomDatePicker";
import TimePicker from "../components/TimePicker";
import moment from "moment";
import ColorBar from "../components/ColorBar";
import constants from "../constants/constants";
import AddTaskButton from "../components/AddTaskButton";
import ModalSheet from "../components/ModalSheet";
import { Ionicons } from "@expo/vector-icons";
import ModalSheetHeader from "../components/ModalSheetHeader";
import themeContext from "../theme/themeContext";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

function AddTaskScreen({ addTask, ...props }) {
  const [task, setTask] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [priority, setPriority] = useState("");
  const [color, setColor] = useState("");

  const theme = useContext(themeContext);

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

  const onCancelPress = () => {
    setTask("");
    setTaskDetails("");
    // setDate("");
    // setTime("");
    setPriority(""), setColor("");
    sheetRef?.current?.close();
    Keyboard.dismiss();
  };

  const handleAddTask = (e) => {
    addTask({
      name: task,
      details: taskDetails,
      priority: priority,
      color: color,
      completed: false,
      id: Date.now(),
    });
    setTask("");
    setTaskDetails("");
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
        style={{ backgroundColor: theme.background }}
      >
        <ModalSheetHeader
          title="Create your task"
          cancel
          onPress={onCancelPress}
          iconColor={theme.color}
          style={{ color: theme.color }}
        />
        <CustomInput
          style={{ paddingHorizontal: constants.m }}
          maxLength={200}
          textStyle={styles.titleText}
          placeholder="e.g, Take my dog to the vet"
          value={task}
          setValue={(value) => setTask(value)}
        />
        <BottomSheetScrollView style={{ paddingHorizontal: constants.m }}>
          <CustomInput
            style={{ marginBottom: constants.xl }}
            maxLength={500}
            textStyle={styles.detailsText}
            placeholder="add notes"
            value={taskDetails}
            setValue={(value) => setTaskDetails(value)}
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
            bgColor={theme.buttonColor}
            fgColor={theme.buttonText}
          />
        </BottomSheetScrollView>
      </ModalSheet>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: constants.m,
    marginTop: constants.sheetTopPadding,
  },
  titleText: {
    fontSize: constants.taskFont,
    maxHeight: constants.titleMaxHeight,
    minHeight: constants.titleMinHeight,
    fontWeight: "bold",
  },
  detailsText: {
    maxHeight: constants.detailsMaxHeight,
    minHeight: constants.detailsMinHeight,
    fontSize: constants.taskDetailsFont,
    fontWeight: "500",
  },

  button: {
    marginTop: 20,
  },
});
export default AddTaskScreen;
