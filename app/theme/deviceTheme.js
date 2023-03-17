import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { dark, light } from "./theme";

export const useDeviceTheme = () => {
  const [appTheme, setAppTheme] = useState(
    Appearance.getColorScheme() === "dark" ? dark : light
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsLoading(true);
      setTimeout(() => {
        setAppTheme(colorScheme === "dark" ? dark : light);
        setIsLoading(false);
      }, 500);
    });

    return () => subscription.remove();
  }, []);

  return { ...appTheme, isLoading };
};
