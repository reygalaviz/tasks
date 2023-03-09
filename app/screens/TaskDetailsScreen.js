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
  const selectedTaskData = route.params.selectedTask;
  const onBackPress = () => {
    navigation.goBack();
  };

  const [updatedTask, setUpdatedTask] = useState(selectedTaskData.name);
  const [updatedTaskDetails, setUpdatedTaskDetails] = useState(
    selectedTaskData.details
  );
  const [updatedDate, setUpdatedDate] = useState(selectedTaskData.date);
  const [updatedTime, setUpdatedTime] = useState(selectedTaskData.time);
  const [updatedPriority, setUpdatedPriority] = useState(
    selectedTaskData.priority
  );
  const [updatedColor, setUpdatedColor] = useState(selectedTaskData.color);

  const handleEditTask = (e) => {
    console.log(updatedDate);
    props.updateTask({
      ...selectedTaskData,
      name: updatedTask,
      details: updatedTaskDetails,
      date: updatedDate.toString().slice(0, 15),
      time: updatedTime.getTime(),
      priority: updatedPriority,
      color: updatedColor,
    });

    navigation.navigate("HomeScreen");
  };
  const handleDeleteTask = () => {
    props.deleteTask(selectedTaskData.id);
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
        selectedTaskData={selectedTaskData}
      />
      <HeaderBar onBackPress={onBackPress} back header="Home" style={{}}>
        <DeleteButton onPress={() => modalVisible()} />
      </HeaderBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <CustomInput
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
            maxLength={500}
            textStyle={styles.detailsText}
            value={updatedTaskDetails.toString()}
            setValue={(value) => setUpdatedTaskDetails(value)}
            placeholder={
              selectedTaskData.details == ""
                ? "add notes"
                : selectedTaskData.details
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
