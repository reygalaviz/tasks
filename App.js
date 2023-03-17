import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import { RecoilRoot } from "recoil";
import StackNavigation from "./app/navigation/StackNavigation";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Appearance,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useDeviceTheme } from "./app/theme/deviceTheme";
import { colorScheme, theme } from "./app/theme/theme";

export default function App() {
  const theme = useDeviceTheme();

  if (theme.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <RecoilRoot>
      <BottomSheetModalProvider>
        <StackNavigation />
      </BottomSheetModalProvider>
    </RecoilRoot>
  );
}
