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
import { firebase } from "../../firebaseConfig";

function TaskDetailsScreen({ navigation, route, ...props }) {
  const theme = useContext(themeContext);
  const rbSheetRef = useRef();
  const modalVisible = () => {
    rbSheetRef.current.open();
  };
  const { task } = route.params;
  const onBackPress = () => {
    navigation.goBack();
  };

  const [updatedTask, setUpdatedTask] = useState(task.task);
  const [updatedTaskDetails, setUpdatedTaskDetails] = useState(
    task.taskDetails
  );
  // const [updatedDate, setUpdatedDate] = useState(task.date);
  // const [updatedTime, setUpdatedTime] = useState(task.time);
  const [updatedPriority, setUpdatedPriority] = useState(task.priority);
  const [updatedColor, setUpdatedColor] = useState(task.color);

  const [error, setError] = useState({});
  const handleError = (err, input) => {
    setError((prev) => ({ ...prev, [input]: err }));
  };

  const handleEditTask = () => {
    if (updatedTask === "") {
      handleError("Please input title", "task");
    } else {
      firebase
        .firestore()
        .collection("tasks")
        .doc(task.id)
        .update({
          task: updatedTask,
          taskDetails: updatedTaskDetails,
          priority: updatedPriority,
          color: updatedColor,
        })
        .then(() => {
          navigation.navigate("HomeScreen");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const handleDeleteTask = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(task.id)
      .delete()
      .then(() => {
        rbSheetRef.current.close();
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleCancelDelete = () => {};

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
            style={{ marginBottom: constants.s }}
            error={error.task}
            onFocus={() => {
              handleError(null, "task");
            }}
            maxLength={200}
            textStyle={styles.titleText}
            value={updatedTask}
            setValue={(value) => setUpdatedTask(value)}
            placeholder={
              task.task === "" ? "e.g, Take my dog to the vet" : task.task
            }
          />
          <CustomInput
            style={{ marginVertical: constants.s }}
            maxLength={500}
            textStyle={styles.detailsText}
            value={updatedTaskDetails}
            setValue={(value) => setUpdatedTaskDetails(value)}
            placeholder={
              task.taskDetails === "" ? "Additional Notes" : task.taskDetails
            }
          />
          {/* <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomDatePicker date={updatedDate} setDate={setUpdatedDate} />
            <CustomTimePicker time={updatedTime} setTime={setUpdatedTime} />
          </View> */}
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
