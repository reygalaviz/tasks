import React, { useContext } from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import constants from "../constants/constants";
import RBottomSheet from "./RBottomSheet";
import CustomButton from "./CustomButton";
import { getTheme } from "../theme/theme";

function DeleteConfirm({
  handleCancelDelete,
  handleDeleteTask,
  message,
  rbSheetRef,
}) {
  const theme = getTheme(useColorScheme());

  return (
    <RBottomSheet rbSheetRef={rbSheetRef}>
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>{message}</Text>
      </View>
      <View style={styles.sheetBody}>
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
    </RBottomSheet>
  );
}
const styles = StyleSheet.create({
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
export default DeleteConfirm;
