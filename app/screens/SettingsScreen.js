import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, StatusBar, Switch } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../theme/themeContext";

function SettingsScreen(props) {
  const [mode, setMode] = useState(false);
  const theme = useContext(themeContext);
  return (
    <>
      <StatusBar barStyle={mode === false ? "dark-content" : "light-content"} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.color }}>Change color theme:</Text>
        <Switch
          value={mode}
          onValueChange={(value) => {
            setMode(value);
            EventRegister.emit("changeTheme", value);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
