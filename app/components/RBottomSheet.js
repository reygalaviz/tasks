import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CustomButton from "./CustomButton";
import themeContext from "../theme/themeContext";
import constants from "../constants/constants";

function RBottomSheet({ rbSheetRef, children, height }) {
  const theme = useContext(themeContext);

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
      openDuration={200}
      height={height}
    >
      {children}
    </RBSheet>
  );
}

const styles = StyleSheet.create({});

export default RBottomSheet;
