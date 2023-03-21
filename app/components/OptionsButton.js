import React, { useRef, useState, useCallback, useContext } from "react";
import { View, Pressable, StyleSheet, useColorScheme } from "react-native";
import { useDeviceTheme } from "../theme/deviceTheme";
import { Entypo } from "@expo/vector-icons";

function OptionsButton({ onOpenOptions }) {
  const theme = useDeviceTheme();

  return (
    <Pressable style={styles.container} onPress={onOpenOptions}>
      <Entypo name="dots-three-horizontal" size={24} color={theme.color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OptionsButton;
