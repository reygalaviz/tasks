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
import CustomTimePicker from "../components/CustomTimePicker";
import ColorBar from "../components/ColorBar";
import constants from "../constants/constants";
import AddTaskButton from "../components/AddTaskButton";
import ModalSheet from "../components/ModalSheet";
import ModalSheetHeader from "../components/ModalSheetHeader";
import themeContext from "../theme/themeContext";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

function AddTaskScreen({ addTask }) {
  const [task, setTask] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState("High");
  const [color, setColor] = useState("#586BA4");

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
    setDate(new Date());
    setTime(new Date());
    setPriority("High"), setColor("#586BA4");
    sheetRef?.current?.close();
    Keyboard.dismiss();
    setError({});
  };
  //error
  const [error, setError] = useState({});
  const handleError = (err, input) => {
    setError((prev) => ({ ...prev, [input]: err }));
  };

  const handleAddTask = () => {
    if (task === "") {
      handleError("Please input title", "task");
    } else {
      addTask({
        name: task,
        details: taskDetails,
        date: date.toString().slice(0, 15),
        time: time.getTime(),
        priority: priority,
        color: color,
        completed: false,
        trash: false,
        id: Date.now(),
      });
      setTask("");
      setTaskDetails("");
      setPriority("High");
      setColor("#586BA4");
      sheetRef?.current?.close();
    }
  };

  return (
    <>
      <AddTaskButton onOpenAddTask={onOpenAddTask} />

      <ModalSheet
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        onChange={handleSnapPress}
        style={{
          backgroundColor: theme.background,
        }}
      >
        <ModalSheetHeader
          title="Create your task"
          cancel
          onPress={onCancelPress}
          iconColor={theme.color}
          style={{ color: theme.color }}
        />

        <BottomSheetScrollView
          style={{ paddingHorizontal: constants.m, marginBottom: constants.m }}
        >
          <CustomInput
            style={{ marginBottom: constants.s }}
            maxLength={200}
            textStyle={styles.titleText}
            placeholder="e.g, Take my dog to the vet"
            error={error.task}
            onFocus={() => {
              handleError(null, "task");
            }}
            value={task}
            setValue={(value) => setTask(value)}
          />
          <CustomInput
            style={{ marginVertical: constants.s }}
            maxLength={500}
            textStyle={styles.detailsText}
            placeholder="Additional Notes"
            value={taskDetails}
            setValue={(value) => setTaskDetails(value)}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomDatePicker date={date} setDate={setDate} />
            <CustomTimePicker time={time} setTime={setTime} />
          </View>
          <ColorBar color={color} setColor={setColor} />

          <PriorityBar
            priority={priority}
            setPriority={setPriority}
            buttons={["High", "Medium", "Low"]}
          />

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
    paddingBottom: constants.l,
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
