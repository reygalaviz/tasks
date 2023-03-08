import React, { useRef, useContext, useState } from "react";
import themeContext from "../theme/themeContext";
import { Pressable, Text, View } from "react-native";
import constants from "../constants/constants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
function CustomDatePicker({ date, setDate }) {
  const theme = useContext(themeContext);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <View
      style={{
        paddingVertical: constants.s,
        marginTop: constants.s,
      }}
    >
      <Pressable
        onPress={showDatePicker}
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather name="calendar" size={24} color="black" />
        <Text
          style={{
            color: theme.color,
            fontSize: constants.taskFontDateTime,
            paddingLeft: constants.s,
            fontWeight: "600",
          }}
        >
          {format(date, "MMMM dd, yyyy")}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        minimumDate={new Date()}
        maximumDate={new Date("2300-06-15")}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

export default CustomDatePicker;
