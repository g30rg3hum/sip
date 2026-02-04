import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack initialRouteName="name" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="name" />
      <Stack.Screen name="gender" />
      <Stack.Screen name="height" />
      <Stack.Screen name="weight" />
    </Stack>
  );
}
