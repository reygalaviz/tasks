import React, { useEffect, useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import { RecoilRoot } from "recoil";
import StackNavigation from "./app/navigation/StackNavigation";
import { Appearance, useColorScheme } from "react-native";
import { getTheme } from "./app/theme/theme";

export default function App() {
  return (
    <PortalProvider>
      <RecoilRoot>
        <BottomSheetModalProvider>
          <StackNavigation />
        </BottomSheetModalProvider>
      </RecoilRoot>
    </PortalProvider>
  );
}
