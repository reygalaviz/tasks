import React, { useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";

const CustomInput = ({ placeholder, value, setValue }) => {
  const theme = useContext(themeContext);
  return (
    <View style={[styles.container, { borderColor: theme.textBorder }]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={{ color: theme.color }}
        placeholderTextColor={theme.color}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default CustomInput;
