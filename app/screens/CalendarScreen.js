import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";
import { Calendar } from "react-native-calendars";

function CalendarScreen({ navigation }) {
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderBar
        back
        date
        onBackPress={onBackPress}
        headerText={styles.headerText}
      />

      <Calendar style={{ borderWidth: 2 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    paddingLeft: constants.s,
    fontSize: constants.header,
    fontWeight: "bold",
  },
});

export default CalendarScreen;
