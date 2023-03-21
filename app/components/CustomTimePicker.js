import React, { useRef, useEffect, useState } from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";
import constants from "../constants/constants";
import { format } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";
import { useDeviceTheme } from "../theme/deviceTheme";
function CustomTimePicker({ time, setTime }) {
  const theme = useDeviceTheme();
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    setCurrentTime(time);
  }, [time]);
  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (time) => {
    setTime(time);
    setCurrentTime(time);
    hideTimePicker();
  };

  return (
    <Pressable
      onPress={() => showTimePicker()}
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        marginTop: constants.s,
        backgroundColor: theme.textBoxBGColor,
        marginLeft: 1,
        width: "45%",
      }}
    >
      <View
        onPress={showTimePicker}
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather name="clock" size={18} color={theme.color} />
        <Text
          style={{
            color: theme.color,
            fontSize: constants.taskFontDateTime,
            paddingLeft: constants.s,
            fontWeight: "600",
          }}
        >
          {currentTime && currentTime instanceof Date && (
            <Text>{currentTime.toLocaleTimeString()}</Text>
          )}
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={timePickerVisible}
        date={currentTime}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        // minimumDate={new Date()}
      />
    </Pressable>
  );
}

export default CustomTimePicker;
