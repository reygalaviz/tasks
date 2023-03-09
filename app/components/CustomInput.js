import React, { useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";

const CustomInput = ({
  placeholder,
  value,
  setValue,
  style,
  textStyle,
  maxHeight,
  minHeight,
  maxLength,
  numberOfLines,
  multiline = true,
}) => {
  const theme = useContext(themeContext);

  return (
    <View
      style={[
        styles.container,
        style,
        { backgroundColor: theme.textBoxBGColor },
      ]}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={[
          {
            color: theme.color,
            maxHeight: maxHeight,
            minHeight: minHeight,
          },
          textStyle,
        ]}
        placeholderTextColor={theme.color}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={multiline}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
  },
});

export default CustomInput;
