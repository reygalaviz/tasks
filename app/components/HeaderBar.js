import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import constants from "../constants/constants";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import Greeting from "./Greeting";
import { getTheme } from "../theme/theme";

function HeaderBar({
  children,
  back,
  reminder,
  date,
  header,
  onBackPress,
  style,
  greeting,
}) {
  const theme = getTheme(useColorScheme());
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
          <Text style={styles.headerText}>
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
