import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderBar from "../components/HeaderBar";
import constants from "../constants/constants";

function CalendarScreen({ navigation }) {
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text>calendar page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CalendarScreen;
