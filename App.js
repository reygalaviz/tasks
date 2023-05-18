import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { RecoilRoot } from "recoil";
import StackNavigation from "./app/navigation/StackNavigation";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function App() {
  useEffect(() => {
    // Request permission to send notifications
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need notification permissions to make this work!");
        return;
      }
    })();
  }, []);
  return (
    <RecoilRoot>
      <BottomSheetModalProvider>
        <StackNavigation />
      </BottomSheetModalProvider>
    </RecoilRoot>
  );
}
