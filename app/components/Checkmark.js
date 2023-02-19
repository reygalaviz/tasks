import React from "react";
import { View, StyleSheet } from "react-native";
function Checkmark(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 25,
    width: 25,
    borderWidth: 1.5,
    borderRadius: 100,
  },
});

export default Checkmark;
