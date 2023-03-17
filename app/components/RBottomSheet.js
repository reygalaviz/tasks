import React, { useContext } from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CustomButton from "./CustomButton";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";

function RBottomSheet({ rbSheetRef, children, height }) {
  const theme = useDeviceTheme();

  return (
    <RBSheet
      ref={rbSheetRef}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: theme.background,
        },
      }}
      openDuration={275}
      height={height}
      dragFromTopOnly={true}
    >
      {children}
    </RBSheet>
  );
}

const styles = StyleSheet.create({});

export default RBottomSheet;
