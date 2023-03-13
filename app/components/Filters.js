import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RBottomSheet from "./RBottomSheet";
import constants from "../constants/constants";
import FilterModalButtons from "./FilterModalButtons";

function Filters({
  rbSheetRef,
  children,
  title,
  resetPressed,
  donePressed,
  height,
}) {
  return (
    <RBottomSheet rbSheetRef={rbSheetRef} height={height}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{title}</Text>
          </View>
          <View style={styles.sheetBody}>{children}</View>
        </View>
      </View>
      <FilterModalButtons
        resetPressed={resetPressed}
        donePressed={donePressed}
      />
    </RBottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetHeader: {
    paddingHorizontal: constants.m,
    paddingVertical: constants.m,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetBody: {
    paddingHorizontal: constants.m,
    flex: 1,
  },
  sheetTitle: {
    fontSize: constants.sectionHeader,
    fontWeight: "600",
  },
});

export default Filters;
