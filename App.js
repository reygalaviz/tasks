import React, { useEffect, useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import { RecoilRoot } from "recoil";
import StackNavigation from "./app/navigation/StackNavigation";
import { Appearance, useColorScheme } from "react-native";
import { getTheme } from "./app/theme/theme";

export default function App() {
  const [theme, setTheme] = useState(getTheme(Appearance.getColorScheme()));

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ theme }) => {
      console.log("add change listener is working");
      setTheme(getTheme(theme));
    });

    return () => subscription.remove();
  }, []);

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
