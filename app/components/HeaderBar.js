import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import constants from "../constants/constants";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import Greeting from "./Greeting";
import { useDeviceTheme } from "../theme/deviceTheme";
import Animated from "react-native-reanimated";

function HeaderBar({ children, back, date, header, onBackPress, style }) {
  const theme = useDeviceTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.layout}>
        {back && (
          <Pressable
            onPress={onBackPress}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Entypo name="chevron-left" size={24} color={theme.color} />
            <Text style={[styles.headerText, { color: theme.color }]}>
              {header}
            </Text>
          </Pressable>
        )}

        {date && (
          <Text style={[styles.headerText, { color: theme.color }]}>
            {moment().format("dddd, MMMM D YYYY")}
          </Text>
        )}
      </View>
      <View style={[styles.layout, styles.right]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: constants.marginTopHeader,
    marginBottom: constants.s,
    marginHorizontal: constants.m,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  layout: {
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
  },
  appName: {
    fontSize: constants.header,
  },
  right: { justifyContent: "flex-end" },
  headerText: {
    paddingLeft: 2,
    fontSize: constants.header,
    fontWeight: "bold",
  },
});

export default HeaderBar;
