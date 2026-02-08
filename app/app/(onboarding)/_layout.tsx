import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      initialRouteName="name"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="name" />
      <Stack.Screen name="age" />
      <Stack.Screen name="gender" />
      <Stack.Screen name="height" />
      <Stack.Screen name="weight" />
      <Stack.Screen name="activity" />
      <Stack.Screen name="climate" />
      <Stack.Screen name="water-target" />
      <Stack.Screen name="water-bottle" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="finish" />
    </Stack>
  );
}
