import React, { useState, useContext } from "react";
import moment from "moment";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import constants from "../constants/constants";
import { useRecoilState } from "recoil";
import { todoDate } from "../recoil/atom/todoDate";
import themeContext from "../theme/themeContext";

function CustomDatePicker({ date, setDate }) {
  const theme = useContext(themeContext);

  const [showDate, setShowDate] = useState(false);

  const onDChange = (e, selectedDate) => {
    setDate(selectedDate);
  };

  const onDateCancel = () => {
    setDate(new Date());
    setShowDate(false);
  };
  const onDateDone = () => {
    props.onDateChange(date);
    setShowDate(false);
  };

  const onClickOutside = () => {
    setDate(new Date());
    setShowDate(false);
  };

  return (
    <Pressable onPress={() => setShowDate(true)}>
      <View>
        <View
          style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.textBorder,
            width: "100%",
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather name="calendar" size={24} color={theme.color} />
          <Text
            style={{
              marginLeft: constants.s,
              fontSize: constants.taskFont,
              color: theme.color,
            }}
          >
            {moment(date).format("LL")}
          </Text>
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={showDate}
          supportedOrientations={["portrait"]}
          onRequestClose={() => setShowDate(false)}
        >
          <View style={{ flex: 1 }}>
            <Pressable
              style={{
                flex: 1,
                alignItems: "flex-end",
                flexDirection: "row",
              }}
              visible={showDate}
              onPress={onClickOutside}
            >
              <View
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
                      value={new Date(date)}
                      mode="date"
                      display="spinner"
                      minimumDate={new Date(moment().format("YYYY-MM-DD"))}
                      maximumDate={
                        new Date(
                          moment().add(120, "years").format("YYYY-MM-DD")
                        )
                      }
                      onChange={onDChange}
                    />
                  </View>
                  <TouchableHighlight
                    underlayColor={"transparent"}
                    onPress={onDateCancel}
                    style={[styles.btnText, styles.btnCancel]}
                  >
                    <Text>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor={"transparent"}
                    onPress={onDateDone}
                    style={[styles.btnText, styles.btnDone]}
                  >
                    <Text>Done</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Pressable>
          </View>
        </Modal>
      </View>
    </Pressable>
  );
}

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

export default CustomDatePicker;
