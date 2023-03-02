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
}) => {
  const theme = useContext(themeContext);

  return (
    <View style={[styles.container, { borderColor: theme.textBorder }, style]}>
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
        placeholderTextColor="gray"
        maxLength={maxLength}
        numberOfLines={3}
        multiline={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default CustomInput;
