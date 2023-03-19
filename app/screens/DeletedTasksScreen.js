import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import TaskCard from "../components/TaskCard";
import DeleteConfirm from "../components/DeleteConfirm";
import { useDeviceTheme } from "../theme/deviceTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DeletedTasksScreen({ navigation, ...props }) {
  const theme = useDeviceTheme();

  const onBackPress = () => {
    navigation.goBack();
  };
  const rbSheetRef = useRef();
  const modalVisible = () => {
    rbSheetRef.current.open();
  };
  const handleDeleteTask = () => {
    deleteTasks(deletedTotalTasks);
    rbSheetRef.current.close();
  };
  const handleCancelDelete = () => {
    rbSheetRef.current.close();
  };

  const deletedTotalTasks = props.tasks.filter((item) => {
    return item.trash == true;
  });

  const deleteTasks = async (tasks) => {
    try {
      const taskKeys = tasks.map((task) => `task:${task.id}`);
      await AsyncStorage.multiRemove(taskKeys);
    } catch (error) {
      console.error(error);
    }
    rbSheetRef.current.close();
  };

  return (
    <View style={styles.container}>
      <DeleteConfirm
        rbSheetRef={rbSheetRef}
        handleCancelDelete={handleCancelDelete}
        handleDeleteTask={handleDeleteTask}
        message="Are you sure you want to delete all tasks?"
      />
      <HeaderBar
        back
        header="Deleted Tasks"
        onBackPress={onBackPress}
        style={{ paddingHorizontal: constants.m }}
      ></HeaderBar>

      <View style={styles.buttons}>
        <Pressable>
          <Text>Undo All</Text>
        </Pressable>
        <Pressable onPress={() => modalVisible()}>
          <Text>Delete All</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={deletedTotalTasks}
          renderItem={({ item }) => {
            return (
              <TaskCard
                task={item}
                updateStatus={props.updateStatus}
                moveToTrashBin={props.moveToTrashBin}
                handleDelete={() => props.deleteTask(item.id)}
                compDel
                selected
              />
            );
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: constants.m,
  },
});

export default DeletedTasksScreen;
