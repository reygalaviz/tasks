import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
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
  error,
  onFocus = () => {},
}) => {
  const theme = useContext(themeContext);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <View
        style={[
          styles.container,
          style,
          {
            backgroundColor: theme.textBoxBGColor,
            borderWidth: error ? 1 : 0,
            borderColor: error ? "#ED6A5E" : isFocused ? "blue" : "gray",
          },
        ]}
      >
        <TextInput
          onFocus={() => {
            onFocus();
            setIsFocused(false);
          }}
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
          placeholderTextColor={theme.placeholderColor}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          multiline={multiline}
        />
      </View>
      {error && (
        <Text
          style={{
            color: "#ED6A5E",
            paddingLeft: constants.s,
            fontWeight: "700",
            fontSize: constants.errorFontSize,
          }}
        >
          {error}
        </Text>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,

    padding: 15,
  },
});

export default CustomInput;
