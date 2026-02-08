import { router, Stack } from "expo-router";
import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Lexend_400Regular,
  Lexend_700Bold,
  useFonts,
} from "@expo-google-fonts/lexend";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    Appearance.setColorScheme("dark");
  }, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      const complete =
        (await AsyncStorage.getItem("onboardingComplete")) === "true";

      if (!complete) {
        router.replace("/(onboarding)/welcome");
      }
      setOnboardingComplete(complete);
    };

    if (loaded || error) {
      SplashScreen.hideAsync();
      checkOnboarding();
    }
  }, [loaded, error]);

  if ((!loaded && !error) || onboardingComplete == null) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(onboarding)" options={{ gestureEnabled: false }} />

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
