import React, { useRef, useContext, useState } from "react";
import themeContext from "../theme/themeContext";
import { Pressable, Text, View } from "react-native";
import constants from "../constants/constants";
import { format } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";

function CustomTimePicker({ time, setTime }) {
  const theme = useContext(themeContext);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (time) => {
    setTime(time);
    hideTimePicker();
  };

  return (
    <View
      style={{
        paddingVertical: constants.s,
        marginTop: constants.s,
      }}
    >
      <Pressable
        onPress={showTimePicker}
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather name="clock" size={24} color="black" />
        <Text
          style={{
            color: theme.color,
            fontSize: constants.taskFontDateTime,
            paddingLeft: constants.s,
            fontWeight: "600",
          }}
        >
          {format(time, "hh:mm a")}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
}

export default CustomTimePicker;
