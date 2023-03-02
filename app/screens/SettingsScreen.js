import React, { useState, useContext, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Switch,
  ScrollView,
} from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../theme/themeContext";
import ModalSheet from "../components/ModalSheet";
import constants from "../constants/constants";
import { Portal, PortalHost } from "@gorhom/portal";
import ModalSheetHeader from "../components/ModalSheetHeader";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

function SettingsScreen({ isOpen, setIsOpen, sheetRef, mode, setMode }) {
  const theme = useContext(themeContext);
  const snapPoints = ["100%"];

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(!isOpen);
  }, []);

  const onCancelPress = () => {
    sheetRef?.current?.close();
  };

  const ThemeSwitch = () => {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.color }}>Change color theme:</Text>
        <Switch
          value={mode}
          onValueChange={(value) => {
            setMode(value);
            EventRegister.emit("changeTheme", value);
          }}
        />
      </View>
    );
  };
  return (
    <>
      <Portal>
        <ModalSheet
          sheetRef={sheetRef}
          snapPoints={snapPoints}
          index={-1}
          onChange={handleSnapPress}
          style={{ backgroundColor: theme.background }}
        >
          <ModalSheetHeader
            title="Settings"
            onPress={onCancelPress}
            iconColor={theme.color}
            style={{ color: theme.color }}
          />
          <BottomSheetScrollView style={{ paddingHorizontal: constants.m }}>
            <View style={styles.themeContainer}>
              <Text style={[styles.themeText, { color: theme.color }]}>
                Dark Mode
              </Text>
              <Switch
                value={mode}
                onValueChange={(value) => {
                  setMode(value);
                  EventRegister.emit("changeTheme", value);
                }}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
            </View>
          </BottomSheetScrollView>
        </ModalSheet>
      </Portal>
      <PortalHost name="host" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: constants.m,
    marginTop: constants.sheetTopPadding,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: constants.l,
  },
  headerText: {
    fontSize: constants.screenHeader,
    fontWeight: "bold",
  },
  themeContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeText: {
    fontSize: constants.sectionHeader,
  },
});

export default SettingsScreen;
