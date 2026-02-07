import { Stack } from "expo-router";
import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Lexend_400Regular,
  Lexend_700Bold,
  useFonts,
} from "@expo-google-fonts/lexend";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Appearance } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  useEffect(() => {
    Appearance.setColorScheme("dark");
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(onboarding)" />

        {/* Settings form sheets */}
        <Stack.Screen
          name="change-name"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: [0.25],
            contentStyle: {
              backgroundColor: "#101319",
            },
            sheetGrabberVisible: true,
          }}
        />

        {/* Actions form sheets */}
        <Stack.Screen
          name="record-drink"
          options={{
            presentation: "formSheet",
            contentStyle: { backgroundColor: "#101319" },
            sheetGrabberVisible: true,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
