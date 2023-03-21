import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import TaskCard from "../components/TaskCard";
import DeleteConfirm from "../components/DeleteConfirm";
import { useDeviceTheme } from "../theme/deviceTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OptionsButton from "../components/OptionsButton";
import RBottomSheet from "../components/RBottomSheet";
import CustomButton from "../components/CustomButton";

function DeletedTasksScreen({ navigation, ...props }) {
  const theme = useDeviceTheme();

  const onBackPress = () => {
    navigation.goBack();
  };
  //delete all ref
  const deleteAllRef = useRef();
  const deleteAllModal = () => {
    deleteAllRef.current.open();
  };
  const handleDeleteAll = () => {
    props.deleteAllTasks();
    deleteAllRef.current.close();
  };
  const handleCancelDelete = () => {
    deleteAllRef.current.close();
  };

  const deletedTotalTasks = props.tasks.filter((item) => {
    return item.trash == true;
  });

  const [showButton, setShowButton] = useState(false);
  const [deletedTasks, setDeletedTasks] = useState([]);

  function handlePress() {
    setShowButton(!showButton);
  }

  const header = "Deleted Tasks " + "(" + deletedTotalTasks.length + ")";
  const title = "Delete " + deletedTotalTasks.length + " tasks";
  const deletedTitleMsg =
    "This action can't be undone and it will permanently delete all tasks";

  const FloatingButtons = ({ onPress, right, left, label }) => {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.floatingBtnStyle,
          {
            bottom: 30,
            right: right,
            left: left,
            backgroundColor: theme.floatingBtnDelColor,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.color }]}>{label}</Text>
      </Pressable>
    );
  };

  const DeletedTasksMessage = () => {
    return (
      <View
        style={{
          paddingHorizontal: constants.m,
          paddingVertical: constants.s,
        }}
      >
        <Text
          style={{
            color: "#808080",
            fontSize: constants.messageFontSize,
            textAlign: "center",
          }}
        >
          deleted tasks have a 15 day lifespan, after that they will be
          permanently deleted.
        </Text>
      </View>
    );
  };

  const ModalBottomSheet = ({
    rbSheetRef,
    label,
    titleMessage,
    onDeletePress,
    onCancelPress,
    bgColor,
  }) => {
    return (
      <RBottomSheet rbSheetRef={rbSheetRef}>
        <View style={styles.sheetHeader}>
          <Text style={[styles.sheetTitle]}>{titleMessage}</Text>
        </View>
        <View style={styles.sheetBody}>
          <CustomButton
            bgColor={bgColor}
            title={label}
            onPress={onDeletePress}
          />
          <CustomButton
            type="SECONDARY"
            title="Cancel"
            fgColor={theme.color}
            onPress={onCancelPress}
          />
        </View>
      </RBottomSheet>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ModalBottomSheet
        rbSheetRef={deleteAllRef}
        label={title}
        titleMessage={deletedTitleMsg}
        bgColor="#ED6A5E"
        onDeletePress={handleDeleteAll}
        onCancelPress={handleCancelDelete}
      />
      <HeaderBar back header={header} onBackPress={onBackPress}>
        {showButton ? (
          <Pressable onPress={handlePress}>
            <Text
              style={{ fontSize: constants.cancelFontSize, color: theme.color }}
            >
              Cancel
            </Text>
          </Pressable>
        ) : (
          <OptionsButton onOpenOptions={handlePress} />
        )}
      </HeaderBar>

      {showButton && (
        <FloatingButtons
          right={20}
          label="Delete All"
          onPress={() => deleteAllModal()}
        />
      )}
      <DeletedTasksMessage />

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

  sheetHeader: {
    paddingTop: constants.m,
    paddingHorizontal: constants.m,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetTitle: {
    marginBottom: constants.m,
    fontSize: constants.messageFontSize,
    color: "#808080",
    fontWeight: "600",
    textAlign: "center",
  },
  sheetBody: {
    paddingHorizontal: constants.m,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingBtnStyle: {
    position: "absolute",
    borderRadius: 30,
    width: 100,
    height: 50,
    padding: constants.s,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1000,
    zIndex: 1000,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default DeletedTasksScreen;
