import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import constants from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

function Greeting(props) {
  const onSearchPressed = () => {
    console.warn("search");
  };

  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (hours < 12) {
    greet = "Good morning";
  } else if (hours >= 12 && hours <= 17) {
    greet = "Good afternoon";
  } else if (hours >= 17 && hours <= 24) {
    greet = "Good evening";
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>{greet}</Text>
        <Pressable style={styles.right} onPress={onSearchPressed}>
          <Ionicons name="ios-search" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={styles.subHeader}>{moment().format("LL")}</Text>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: constants.daygreeting,
  },
  subHeader: {
    fontSize: constants.header,
  },
  right: {
    justifyContent: "center",
  },
});

export default Greeting;
