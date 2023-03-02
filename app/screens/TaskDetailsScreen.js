import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import CustomDatePicker from "../components/CustomDatePicker";
import TimePicker from "../components/TimePicker";
import ColorBar from "../components/ColorBar";
import PriorityBar from "../components/PriorityBar";
import DeleteButton from "../components/DeleteButton";

function TaskDetailsScreen({ navigation, route, ...props }) {
  const selectedTaskData = route.params.selectedTask;
  const onBackPress = () => {
    navigation.goBack();
  };

  const [updatedTask, setUpdatedTask] = useState(selectedTaskData.name);
  const [updatedTaskDetails, setUpdatedTaskDetails] = useState(
    selectedTaskData.details
  );
  // const [updatedDate, setUpdatedDate] = useState(selectedTask.date);
  // const [updatedTime, setUpdatedTime] = useState(selectedTask.time);
  const [updatedPriority, setUpdatedPriority] = useState(
    selectedTaskData.priority
  );
  const [updatedColor, setUpdatedColor] = useState(selectedTaskData.color);
  console.log(selectedTaskData);

  const updateTask = (task) => {
    props.setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? {
              ...t,
              name: task.name,
              details: task.details,
              priority: task.priority,
              color: task.color,
            }
          : t
      )
    );
  };
  const handleEditTask = (e) => {
    updateTask({
      ...selectedTaskData,
      name: updatedTask,
      details: updatedTaskDetails,
      priority: updatedPriority,
      color: updatedColor,
    });
    console.log(updatedTaskDetails);
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <HeaderBar onBackPress={onBackPress} back header="Home" style={{}}>
        <DeleteButton />
      </HeaderBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <CustomInput
            style={styles.textbox}
            maxLength={200}
            textStyle={styles.titleText}
            value={updatedTask.toString()}
            setValue={(value) => setUpdatedTask(value)}
            placeholder={
              selectedTaskData.name == ""
                ? "e.g, Take my dog to the vet"
                : selectedTaskData.name
            }
          />
          <CustomInput
            style={[styles.textbox, { marginBottom: constants.xl }]}
            maxLength={500}
            textStyle={styles.detailsText}
            value={updatedTaskDetails.toString()}
            setValue={(value) => setUpdatedTaskDetails(value)}
            placeholder={
              selectedTaskData.details == ""
                ? "Add notes"
                : selectedTaskData.details
            }
          />
          {/* <DatePicker
            date={updatedDate}
            setDate={setUpdatedDate}
            onDateChange={(date) => console.log(date)}
          />
          <TimePicker
            time={updatedTime}
            setTime={setUpdatedTime}
            onTimeChange={(time) => console.log(time)}
          /> */}

          <PriorityBar
            priority={updatedPriority}
            setPriority={setUpdatedPriority}
            buttons={["High", "Medium", "Low"]}
          />
          <ColorBar color={updatedColor} setColor={setUpdatedColor} />
          <CustomButton
            onPress={handleEditTask}
            title="Update"
            style={[styles.button]}
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
