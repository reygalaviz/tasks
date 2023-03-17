import React, { useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  useColorScheme,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import CustomDatePicker from "../components/CustomDatePicker";
import ColorBar from "../components/ColorBar";
import PriorityBar from "../components/PriorityBar";
import DeleteButton from "../components/DeleteButton";
import CustomTimePicker from "../components/CustomTimePicker";
import DeleteConfirm from "../components/DeleteConfirm";
import { useDeviceTheme } from "../theme/deviceTheme";

function TaskDetailsScreen({ navigation, route, ...props }) {
  const theme = useDeviceTheme();

  const rbSheetRef = useRef();
  const modalVisible = () => {
    rbSheetRef.current.open();
  };
  const { task } = route.params;
  const onBackPress = () => {
    navigation.goBack();
  };

  const [updatedTask, setUpdatedTask] = useState(task.name);
  const [updatedTaskDetails, setUpdatedTaskDetails] = useState(task.details);
  const [updatedDate, setUpdatedDate] = useState(new Date(task.date));
  const [updatedTime, setUpdatedTime] = useState(new Date(task.time));
  const [updatedPriority, setUpdatedPriority] = useState(task.priority);
  const [updatedColor, setUpdatedColor] = useState(task.color);

  const [error, setError] = useState({});
  const handleError = (err, input) => {
    setError((prev) => ({ ...prev, [input]: err }));
  };

  const handleEditTask = (e) => {
    if (updatedTask === "") {
      handleError("Please input title", "task");
    } else {
      props.updateTask({
        ...task,
        name: updatedTask,
        details: updatedTaskDetails,
        date: updatedDate.toISOString(),
        time: updatedTime.toISOString(),
        priority: updatedPriority,
        color: updatedColor,
      });
      navigation.navigate("HomeScreen");
    }
  };
  const handleDeleteTask = () => {
    props.deleteTask(task.id);
    rbSheetRef.current.close();
    navigation.navigate("HomeScreen");
  };
  const handleCancelDelete = () => {
    rbSheetRef.current.close();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <DeleteConfirm
        rbSheetRef={rbSheetRef}
        handleCancelDelete={handleCancelDelete}
        handleDeleteTask={handleDeleteTask}
        message="Are you sure you want to delete task?"
      />
      <HeaderBar
        onBackPress={onBackPress}
        back
        header="Task Details"
        style={{ paddingHorizontal: constants.m }}
      >
        <DeleteButton onPress={() => modalVisible()} />
      </HeaderBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <CustomInput
            style={{ marginBottom: constants.s }}
            error={error.task}
            onFocus={() => {
              handleError(null, "task");
            }}
            maxLength={200}
            textStyle={styles.titleText}
            value={updatedTask}
            setValue={(value) => setUpdatedTask(value)}
            placeholder={task.name}
          />
          <CustomInput
            style={{ marginVertical: constants.s }}
            maxLength={500}
            textStyle={styles.detailsText}
            value={updatedTaskDetails}
            setValue={(value) => setUpdatedTaskDetails(value)}
            placeholder={
              task.details === "" ? "Additional Notes" : task.details
            }
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomDatePicker date={updatedDate} setDate={setUpdatedDate} />
            <CustomTimePicker time={updatedTime} setTime={setUpdatedTime} />
          </View>
          <ColorBar color={updatedColor} setColor={setUpdatedColor} />
          <PriorityBar
            priority={updatedPriority}
            setPriority={setUpdatedPriority}
            buttons={["High", "Medium", "Low"]}
          />

          <CustomButton
            onPress={handleEditTask}
            title="Update"
            style={[styles.button]}
            fgColor={theme.buttonText}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
  form: {
    paddingHorizontal: constants.m,
    marginTop: constants.m,
  },
  textbox: {
    paddingHorizontal: 0,
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
});

export default TaskDetailsScreen;
