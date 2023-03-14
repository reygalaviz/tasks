import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import constants from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { getTheme } from "../theme/theme";

function Greeting({ OnCalendarPress }) {
  const theme = getTheme(useColorScheme());

  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (hours < 12) {
    greet = "Good morning";
  } else if (hours >= 12 && hours <= 17) {
    greet = "Good afternoon";
  } else if (hours >= 17 && hours <= 24) {
    greet = "Good evening";
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withSequence(
            withTiming(-10),
            withDelay(1500, withTiming(0)),
            withTiming(-10)
          ),
          -1,
          true
        ),
      },
    ],
  }));
  return (
    <>
      <Animated.View style={[styles.container]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></View>

        <Text style={[styles.subHeader, { color: theme.color }]}>
          {moment().format("dddd, MMMM D YYYY")}
        </Text>
      </Animated.View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: constants.m,
  },
  header: {
    fontSize: constants.daygreeting,
  },
  subHeader: {
    fontSize: constants.header,
  },
  right: {
    justifyContent: "center",
  },
});

export default Greeting;
