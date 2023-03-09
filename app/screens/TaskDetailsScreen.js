import React, { useState, useRef, useContext } from "react";
import { View, StyleSheet, Text, ScrollView, Modal } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import CustomDatePicker from "../components/CustomDatePicker";
import ColorBar from "../components/ColorBar";
import PriorityBar from "../components/PriorityBar";
import DeleteButton from "../components/DeleteButton";
import themeContext from "../theme/themeContext";
import RBottomSheet from "../components/RBottomSheet";
import CustomTimePicker from "../components/CustomTimePicker";

function TaskDetailsScreen({ navigation, route, ...props }) {
  const theme = useContext(themeContext);
  const rbSheetRef = useRef();
  const modalVisible = () => {
    rbSheetRef.current.open();
  };
  const { selectedTask, id } = route.params;
  const onBackPress = () => {
    navigation.goBack();
  };

  const [updatedTask, setUpdatedTask] = useState(selectedTask.name);
  const [updatedTaskDetails, setUpdatedTaskDetails] = useState(
    selectedTask.details
  );
  const [updatedDate, setUpdatedDate] = useState(selectedTask.date);
  const [updatedTime, setUpdatedTime] = useState(selectedTask.time);
  const [updatedPriority, setUpdatedPriority] = useState(selectedTask.priority);
  const [updatedColor, setUpdatedColor] = useState(selectedTask.color);

  const handleEditTask = (e) => {
    props.updateTask({
      ...selectedTask,
      name: updatedTask,
      details: updatedTaskDetails,
      date: updatedDate.toString().slice(0, 15),
      time: updatedTime,
      priority: updatedPriority,
      color: updatedColor,
    });

    navigation.navigate("HomeScreen");
  };
  const handleDeleteTask = () => {
    props.deleteTask(selectedTask.id);
    rbSheetRef.current.close();
    navigation.navigate("HomeScreen");
  };
  const handleCancelDelete = () => {
    rbSheetRef.current.close();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <RBottomSheet
        rbSheetRef={rbSheetRef}
        handleCancelDelete={handleCancelDelete}
        handleDeleteTask={handleDeleteTask}
      />
      <HeaderBar
        onBackPress={onBackPress}
        back
        header="Home"
        style={{ paddingHorizontal: constants.m }}
      >
        <DeleteButton onPress={() => modalVisible()} />
      </HeaderBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <CustomInput
            maxLength={200}
            textStyle={styles.titleText}
            value={updatedTask}
            setValue={(value) => setUpdatedTask(value)}
            placeholder={
              selectedTask.name == ""
                ? "e.g, Take my dog to the vet"
                : selectedTask.name
            }
          />
          <CustomInput
            maxLength={500}
            textStyle={styles.detailsText}
            value={updatedTaskDetails}
            setValue={(value) => setUpdatedTaskDetails(value)}
            placeholder={
              selectedTask.details == "" ? "add notes" : selectedTask.details
            }
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
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
            bgColor={theme.buttonColor}
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
