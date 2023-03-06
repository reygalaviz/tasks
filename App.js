import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { HomeScreen, SettingsScreen } from "./app/screens";
import themeContext from "./app/theme/themeContext";
import theme from "./app/theme/theme";
import { storeData, getData } from "./app/asyncstorage/asyncStorage";
import { EventRegister } from "react-native-event-listeners";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import { RecoilRoot } from "recoil";
import StackNavigation from "./app/navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  return (
    <PortalProvider>
      <RecoilRoot>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <themeContext.Provider
              value={mode === true ? theme.dark : theme.light}
            >
              <StackNavigation />
            </themeContext.Provider>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </RecoilRoot>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({});
