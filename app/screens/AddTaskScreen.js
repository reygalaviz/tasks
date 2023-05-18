import React, { useState, useRef, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import PriorityBar from "../components/PriorityBar";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTimePicker from "../components/CustomTimePicker";
import ColorBar from "../components/ColorBar";
import constants from "../constants/constants";
import ModalSheet from "../components/ModalSheet";
import ModalSheetHeader from "../components/ModalSheetHeader";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useDeviceTheme } from "../theme/deviceTheme";
import * as Notifications from "expo-notifications";
import ReminderOptionsModal from "../components/ReminderOptionsModal";

function AddTaskScreen({
  addTask,
  tasks,
  snapPoints,
  sheetRef,
  onOpenAddTask,
  handleSnapPress,
  flatListRef,
}) {
  const theme = useDeviceTheme();

  const [task, setTask] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState("High");
  const [color, setColor] = useState("#fbf8cc");
  const [reminderOption, setReminderOption] = useState(0);

  const onCancelPress = () => {
    setReminderOption(0);
    setTask("");
    setTaskDetails("");
    setDate(new Date());
    setTime(new Date());
    setPriority("High"), setColor("#fbf8cc");
    sheetRef?.current?.close();
    Keyboard.dismiss();
    setError({});
  };
  //error
  const [error, setError] = useState({});
  const handleError = (err, input) => {
    setError((prev) => ({ ...prev, [input]: err }));
  };
  const scheduleNotification = async (date, time, title, message) => {
    const notificationDate = new Date(date);
    notificationDate.setHours(time.getHours());
    notificationDate.setMinutes(time.getMinutes());

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: message,
        sound: true,
      },
      trigger: notificationDate,
    });
  };

  const handleAddTask = async () => {
    // Check if notification permissions are granted
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Notification permission",
        "Please enable notifications in the device settings to use this feature.",
        [{ text: "OK" }]
      );
      return;
    }
    if (task === "") {
      handleError("Please provide a title", "task");
    } else {
      addTask({
        name: task,
        details: taskDetails,
        date: date.toISOString(),
        time: time.toISOString(),
        priority: priority,
        color: color,
        completed: false,
        trash: false,
        completedOn: null,
        id: Date.now(),
      });
      // Schedule a notification for the task
      const notificationTitle = "bulletin";
      const notificationMessage = `Dont't forget to ${task} at ${time.getHours()}:${time.getMinutes()}`;
      await scheduleNotification(
        date,
        time,
        notificationTitle,
        notificationMessage
      );

      // if (reminderOption > 0) {
      //   // Calculate the reminder time
      //   const taskTimeMinutes = time.getHours() * 60 + time.getMinutes();
      //   const reminderTimeMinutes = Math.max(
      //     taskTimeMinutes - reminderOption,
      //     0
      //   );

      //   // Convert the reminder time to hours and minutes
      //   const reminderHours = Math.floor(reminderTimeMinutes / 60);
      //   const reminderMinutes = reminderTimeMinutes % 60;

      //   // Create a new date object for the reminder time
      //   const reminderDate = new Date(date);
      //   reminderDate.setHours(reminderHours);
      //   reminderDate.setMinutes(reminderMinutes);

      //   // Schedule a notification for the task reminder
      //   const reminderTitle = "Task Reminder";
      //   const reminderMessage = `${task} in ${reminderOption} minutes`;
      //   await scheduleNotification(
      //     reminderDate,
      //     reminderTitle,
      //     reminderMessage
      //   );
      // }
      setTask("");
      setTaskDetails("");
      setPriority("High");
      setColor("#fbf8cc");
      setDate(new Date());
      setTime(new Date());
      sheetRef?.current?.close();
    }
  };

  return (
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomDatePicker date={date} setDate={setDate} />
          <CustomTimePicker time={time} setTime={setTime} />
        </View>
        <ReminderOptionsModal
          reminderOption={reminderOption}
          setReminderOption={setReminderOption}
        />
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
          fgColor={theme.buttonText}
        />
      </BottomSheetScrollView>
    </ModalSheet>
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
