import React, { useRef, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalSheet from "./ModalSheet";
import SettingsScreen from "../screens/SettingsScreen";

function SettingsButton({ onPress }) {
  const sheetRef = useRef();
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = ["90%"];

  const onOpenAddTask = () => {
    sheetRef.current?.expand();
  };
  return (
    <>
      <Pressable onPress={onOpenAddTask}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </Pressable>
      <ModalSheet sheetRef={sheetRef} snapPoints={snapPoints} index={-1}>
        <SettingsScreen />
      </ModalSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SettingsButton;
