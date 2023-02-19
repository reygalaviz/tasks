import React, { useState } from "react";
import moment from "moment";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import constants from "../constants/constants";

function TimePicker({ time, setTime, ...props }) {
  const { textStyle, defaultTime } = props;

  const [showTime, setShowTime] = useState(false);

  const onTChange = (e, selectedTime) => {
    setTime(moment(selectedTime));
  };
  const onTimeCancel = () => {
    setTime(moment(defaultTime));
    setShowTime(false);
  };
  const onTimeDone = () => {
    props.onTimeChange(time);
    setShowTime(false);
  };

  const onClickOutside = () => {
    setTime(moment(defaultTime));
    setShowTime(false);
  };

  return (
    <>
      <Pressable activeOpacity={0} onPress={() => setShowTime(true)}>
        <View>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderRadius: 10,
              width: "100%",
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather name="clock" size={24} color="black" />
            <Text
              style={{ marginLeft: constants.s, fontSize: constants.taskFont }}
            >
              {moment(time).format("LT")}
            </Text>
          </View>

          <Modal
            transparent={true}
            animationType="slide"
            visible={showTime}
            supportedOrientations={["portrait"]}
            onRequestClose={() => setShowTime(false)}
          >
            <View style={{ flex: 1 }}>
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  flexDirection: "row",
                }}
                activeOpacity={0}
                visible={showTime}
                onPress={onClickOutside}
              >
                <TouchableHighlight
                  underlayColor="white"
                  style={{
                    flex: 1,
                    borderTopEndRadius: "10",
                    backgroundColor: "white",
                  }}
                  onPress={() => console.log("datepicker clicked")}
                >
                  <View
                    style={{
                      height: "40%",
                      overflow: "hidden",
                    }}
                  >
                    <View style={{ marginTop: 50 }}>
                      <DateTimePicker
                        value={new Date(time)}
                        mode="time"
                        display="spinner"
                        onChange={onTChange}
                      />
                    </View>
                    <TouchableHighlight
                      underlayColor={"transparent"}
                      onPress={onTimeCancel}
                      style={[styles.btnText, styles.btnCancel]}
                    >
                      <Text>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={"transparent"}
                      onPress={onTimeDone}
                      style={[styles.btnText, styles.btnDone]}
                    >
                      <Text>Done</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </Pressable>
            </View>
          </Modal>
        </View>
      </Pressable>
    </>
  );
}

TimePicker.defaultProps = {
  textStyle: {},

  defaultTime: moment(),

  onTimeChange: () => {},
};

const styles = StyleSheet.create({
  btnText: {
    position: "absolute",
    top: 0,
    height: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
});

export default TimePicker;
