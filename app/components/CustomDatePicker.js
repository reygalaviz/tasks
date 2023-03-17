import React, { useRef, useContext, useState } from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";
import constants from "../constants/constants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { useDeviceTheme } from "../theme/deviceTheme";
function CustomDatePicker({ date, setDate }) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const theme = useDeviceTheme();

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
    <Pressable
      onPress={() => showDatePicker()}
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        marginTop: constants.s,
        backgroundColor: theme.textBoxBGColor,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather name="calendar" size={18} color={theme.color} />
        <Text
          style={{
            color: theme.color,
            fontSize: constants.taskFontDateTime,
            paddingLeft: constants.s,
            fontWeight: "600",
          }}
        >
          {date.toString().slice(0, 15)}
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        minimumDate={new Date()}
        maximumDate={new Date("2300-06-15")}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

export default CustomDatePicker;
