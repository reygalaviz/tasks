import React, { useRef, useEffect, useState } from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";
import constants from "../constants/constants";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";
import { useDeviceTheme } from "../theme/deviceTheme";
function CustomTimePicker({ time, setTime }) {
  const theme = useDeviceTheme();
  const [currenTime, setCurrentTime] = useState(new Date()); // add this state variable

  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (time) => {
    time.setSeconds(0);
    setTime(time);
    hideTimePicker();
  };

  useEffect(() => {
    setCurrentTime(new Date()); // update the current date every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
          {time && time instanceof Date && (
            <Text>{moment(time || currenTime).format(" h:mm a")}</Text>
          )}
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={timePickerVisible}
        date={time && currenTime}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        // minimumDate={new Date()}
      />
    </Pressable>
  );
}

export default CustomTimePicker;
