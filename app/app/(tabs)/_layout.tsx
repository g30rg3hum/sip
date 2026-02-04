import { ACCENT, FOREGROUND } from "@/lib/constants/colors";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs
      labelStyle={{
        fontFamily: "Lexend_700Bold",
        fontSize: 10,
        color: FOREGROUND,
      }}
      tintColor={ACCENT}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf={{ default: "drop", selected: "drop.fill" }}
        />
        <NativeTabs.Trigger.Label>Drink</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="analytics">
        <NativeTabs.Trigger.Icon
          sf={{ default: "list.clipboard", selected: "list.clipboard.fill" }}
        />
        <NativeTabs.Trigger.Label>Analytics</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon
          sf={{ default: "gearshape", selected: "gearshape.fill" }}
        />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
