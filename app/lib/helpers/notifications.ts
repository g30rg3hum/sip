import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const FREQUENCY_TO_SECONDS: Record<string, number> = {
  "30m": 30 * 60,
  "1h": 60 * 60,
  "2h": 2 * 60 * 60,
  "3h": 3 * 60 * 60,
  "4h": 4 * 60 * 60,
  "5h": 5 * 60 * 60,
  "6h": 6 * 60 * 60,
  Never: 0,
};
type Frequency = keyof typeof FREQUENCY_TO_SECONDS;

export async function requestNotificationPermissions(): Promise<boolean> {
  const currentSetting = await Notifications.getPermissionsAsync();

  const isCurrentlyAuthorized =
    currentSetting.ios?.status ===
    Notifications.IosAuthorizationStatus.AUTHORIZED;

  if (isCurrentlyAuthorized) return true;

  // if previously denied, the OS won't show the prompt again — send to Settings
  if (
    currentSetting.ios?.status === Notifications.IosAuthorizationStatus.DENIED
  ) {
    Alert.alert(
      "Notifications Disabled",
      "You previously denied notifications. Please enable them in Settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ],
    );
    return false;
  }

  // first time asking — show the OS prompt
  const newSetting = await Notifications.requestPermissionsAsync();

  return (
    newSetting.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED
  );
}

export async function scheduleNotifications(
  frequency: Frequency,
): Promise<void> {
  // Cancel any existing reminders first
  await Notifications.cancelAllScheduledNotificationsAsync();

  // may be never.
  const seconds = FREQUENCY_TO_SECONDS[frequency];
  if (!seconds || seconds === 0) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to Sip! 💧",
      body: "Hey, friendly reminder to drink some water and log it into the app.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: true,
    },
  });

  await AsyncStorage.setItem("notificationFrequency", frequency);
}
