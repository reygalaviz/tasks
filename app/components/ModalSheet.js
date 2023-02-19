import React from "react";
import { View, Text, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

function ModalSheet({
  children,
  sheetRef,
  snapPoints,
  index,
  onChange,
  style,
}) {
  return (
    <BottomSheet
      ref={sheetRef}
      containerStyle={[styles.container]}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      index={index}
      onChange={onChange}
      handleIndicatorStyle={{ display: "none" }}
      backgroundStyle={style}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
});

export default ModalSheet;
