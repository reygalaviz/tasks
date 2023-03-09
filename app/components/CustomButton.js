import React, { useContext } from "react";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import themeContext from "../theme/themeContext";

const CustomButton = ({
  title,
  onPress,
  type = "PRIMARY",
  bgColor,
  fgColor,
  style,
}) => {
  const theme = useContext(themeContext);

  return (
    <Pressable
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
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  container_PRIMARY: {
    backgroundColor: "black",
  },
  container_SECONDARY: {
    borderColor: "lightgray",
    borderWidth: 1,
  },
  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_SECONDARY: {
    color: "gray",
  },
  text_TERTIARY: {
    color: "gray",
  },
});

export default CustomButton;
