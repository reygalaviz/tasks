import React, { useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { getTheme } from "../theme/theme";
import constants from "../constants/constants";

const CustomButton = ({
  title,
  onPress,
  type = "PRIMARY",
  bgColor,
  fgColor,
  style,
}) => {
  const theme = getTheme(useColorScheme());

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        [styles.container],
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          [styles.text],
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: constants.buttonsHeight,
  },
  container_PRIMARY: {
    backgroundColor: "#DD6E42",
  },
  container_SECONDARY: {
    borderColor: "lightgray",
    borderWidth: 1,
  },
  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: constants.buttonTextSize,
  },
  text_SECONDARY: {
    color: "gray",
  },
  text_TERTIARY: {
    color: "gray",
  },
});

export default CustomButton;
