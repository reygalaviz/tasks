import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import constants from "../constants/constants";
import { useDeviceTheme } from "../theme/deviceTheme";
import Filters from "./Filters";
function ReminderOptionsModal({ reminderOption, setReminderOption }) {
  const theme = useDeviceTheme();

  const optionRef = useRef();
  const openReminderOptions = () => {
    optionRef.current.open();
  };

  //options
  const options = [
    { label: "10 minutes before", value: 10 },
    { label: "15 minutes before", value: 15 },
    { label: "20 minutes before", value: 20 },
    { label: "30 minutes before", value: 30 },
  ];

  const handleSubmit = () => {
    optionRef.current.close();
  };
  const handleReset = () => {
    setReminderOption(0);
  };

  return (
    <>
      <View style={[styles.rowWrapper, { marginTop: constants.s }]}>
        <TouchableOpacity
          onPress={() => openReminderOptions()}
          style={[
            styles.row,
            {
              backgroundColor: theme.textBoxBGColor,
              borderRadius: 10,
            },
          ]}
        >
          <Text style={[styles.rowLabel, { color: theme.color }]}>
            Remind Me
          </Text>
          <View style={styles.rowSpacer} />
          <Text style={[styles.rowLabel, { color: theme.color }]}>
            {reminderOption ? `${reminderOption} minutes before` : ""}
          </Text>
        </TouchableOpacity>
      </View>

      <Filters
        rbSheetRef={optionRef}
        title="Remind Me"
        height={constants.reminderModalHeight}
        donePressed={() => handleSubmit()}
        resetPressed={() => handleReset()}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginBottom: 10 }}
        >
          {options.map(({ label, value }) => {
            const isActive = reminderOption === value;
            return (
              <View key={value} style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => setReminderOption(value)}
                  style={[
                    styles.row,
                    isActive
                      ? { backgroundColor: theme.filterActiveButton }
                      : { backgroundColor: theme.filterInActiveButton },
                  ]}
                >
                  <Text
                    style={[
                      styles.rowLabel,
                      isActive
                        ? { color: theme.background }
                        : { color: theme.color },
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </Filters>
    </>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    marginBottom: constants.s,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: constants.m,
    paddingVertical: constants.m,
    borderRadius: 20,
  },
  rowLabel: {
    fontSize: constants.sectionItem,
    fontWeight: "700",
  },
  rowSpacer: {
    flex: 1,
  },
  optionActive: {},
});

export default ReminderOptionsModal;
