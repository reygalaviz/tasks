import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import HeaderBar from "../components/HeaderBar";
import TaskFlatList from "../components/TaskFlatList";
import constants from "../constants/constants";
import DeletedTaskCardContent from "../components/DeletedTaskCardContent";

function DeletedTasksScreen({ navigation, ...props }) {
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
        <Pressable>
          <Text>Delete All</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <TaskFlatList
          tasks={props.tasks}
          renderItem={({ item }) => {
            if (item && item.trash == true) {
              return (
                <DeletedTaskCardContent
                  task={item}
                  updateStatus={props.updateStatus}
                  deleteTask={props.deleteTask}
                  moveToTrashBin={props.moveToTrashBin}
                />
              );
            }
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
