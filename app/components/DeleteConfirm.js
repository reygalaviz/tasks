import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import constants from "../constants/constants";
import RBSheet from "react-native-raw-bottom-sheet";

function DeleteConfirm() {
  return <RBSheet ref={rbSheetRef}></RBSheet>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent: "flex-end",
  },
});
export default DeleteConfirm;
