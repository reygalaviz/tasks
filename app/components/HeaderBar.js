import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";
import moment from "moment";
import { Feather } from "@expo/vector-icons";

function HeaderBar({
  children,
  back,
  reminder,
  date,
  headerText,
  onBackPress,
}) {
  const theme = useContext(themeContext);
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        {back && (
          <Pressable onPress={onBackPress}>
            <Feather name="chevron-left" size={24} color="black" />
          </Pressable>
        )}
        {reminder && (
          <Text style={[styles.appName, { color: theme.color }]}>reminder</Text>
        )}
        {date && <Text style={headerText}>{moment().format("LL")}</Text>}
      </View>
      <View style={[styles.layout, styles.right]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: constants.m,
    marginTop: constants.marginTopHeader,
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
});

export default HeaderBar;
