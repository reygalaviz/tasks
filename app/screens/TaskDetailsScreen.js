import React, { useState, useRef, useContext } from "react";
import { View, StyleSheet, Text, ScrollView, Modal } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import CustomDatePicker from "../components/CustomDatePicker";
import TimePicker from "../components/TimePicker";
import ColorBar from "../components/ColorBar";
import PriorityBar from "../components/PriorityBar";
import DeleteButton from "../components/DeleteButton";
import RBSheet from "react-native-raw-bottom-sheet";
import themeContext from "../theme/themeContext";

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
      <RBSheet
        ref={rbSheetRef}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: theme.background,
          },
        }}
        openDuration={200}
      >
        <View style={styles.sheetHeader}>
          <Text
            numberOfLines={1}
            style={[styles.sheetTitle, { color: theme.color }]}
          >
            {selectedTaskData.name !== ""
              ? selectedTaskData.name
              : selectedTaskData.details}
          </Text>
        </View>
        <View style={styles.sheetBody}>
          <Text
            numberOfLines={1}
            style={[styles.bodyText, { color: theme.color }]}
          >
            Are you sure tou want to delete?
          </Text>
          <CustomButton
            bgColor="#ED6A5E"
            title="Delete"
            onPress={() => handleDeleteTask()}
          />
          <CustomButton
            type="SECONDARY"
            title="Cancel"
            onPress={handleCancelDelete}
            fgColor={theme.color}
          />
        </View>
      </RBSheet>

      <HeaderBar onBackPress={onBackPress} back header="Home" style={{}}>
        <DeleteButton onPress={() => modalVisible()} />
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
                ? "add notes"
                : selectedTaskData.details
            }
          />
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
            bgColor={theme.buttonBarColor}
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
  sheet: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sheetHeader: {
    paddingTop: constants.m,
    paddingHorizontal: constants.m,
    borderBottomWidth: 1,
    borderColor: "#a7a7a7",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetTitle: {
    fontSize: constants.sectionHeader,
    fontWeight: "600",
  },
  sheetBody: {
    paddingHorizontal: constants.m,

    alignItems: "center",
    justifyContent: "center",
  },
  bodyText: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: constants.m,
    textAlign: "center",
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
