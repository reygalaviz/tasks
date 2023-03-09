import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import constants from "../constants/constants";
import themeContext from "../theme/themeContext";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";

function HeaderBar({
  children,
  back,
  reminder,
  date,
  header,
  onBackPress,
  style,
}) {
  const theme = useContext(themeContext);
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
        {reminder && (
          <Text style={[styles.appName, { color: theme.color }]}>reminder</Text>
        )}

        {date && <Text style={styles.headerText}>{moment().format("LL")}</Text>}
      </View>
      <View style={[styles.layout, styles.right]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  headerText: {
    paddingLeft: 2,
    fontSize: constants.header,
    fontWeight: "bold",
  },
});

export default HeaderBar;
