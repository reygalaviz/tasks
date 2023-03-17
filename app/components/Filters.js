import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RBottomSheet from "./RBottomSheet";
import constants from "../constants/constants";
import FilterModalButtons from "./FilterModalButtons";
import { useDeviceTheme } from "../theme/deviceTheme";

function Filters({
  rbSheetRef,
  children,
  title,
  resetPressed,
  donePressed,
  height,
  disabled,
  opacity,
}) {
  const theme = useDeviceTheme();

  return (
    <RBottomSheet rbSheetRef={rbSheetRef} height={height}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.sheetHeader}>
            <Text style={[styles.sheetTitle, { color: theme.color }]}>
              {title}
            </Text>
          </View>
          <View style={styles.sheetBody}>{children}</View>
        </View>
      </View>
      <FilterModalButtons
        resetPressed={resetPressed}
        donePressed={donePressed}
        disabled={disabled}
        opacity={opacity}
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
