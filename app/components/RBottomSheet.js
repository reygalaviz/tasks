import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CustomButton from "./CustomButton";
import themeContext from "../theme/themeContext";
import constants from "../constants/constants";

function RBottomSheet({
  rbSheetRef,
  handleCancelDelete,
  handleDeleteTask,
  selectedTaskData,
}) {
  const theme = useContext(themeContext);

  return (
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
          Are you sure you want to delete?
        </Text>
        <CustomButton
          bgColor="#ED6A5E"
          title="Delete"
          onPress={() => handleDeleteTask()}
        />
        <CustomButton
          type="SECONDARY"
          title="Cancel"
          onPress={() => handleCancelDelete()}
          fgColor={theme.color}
        />
      </View>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sheetHeader: {
    paddingTop: constants.m,
    paddingHorizontal: constants.m,
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
    fontWeight: "500",
    marginVertical: constants.m,
    textAlign: "center",
  },
});

export default RBottomSheet;
