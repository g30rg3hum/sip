import BigButton from "@/components/big-button";
import ContentContainer from "@/components/content-container";
import PickerInput from "@/components/form/picker-input";
import { FOREGROUND, MUTED_FOREGROUND } from "@/lib/constants/colors";
import { globalStyles } from "@/lib/constants/styles";
import { GlassView } from "expo-glass-effect";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const appIcon = require("@/assets/images/app-icon.png");

const FREQUENCIES = ["30m", "1h", "2h", "3h", "4h", "5h", "6h", "Never"];

export default function OnboardingNotifications() {
  const router = useRouter();

  const [notiFrequency, setNotiFrequency] = useState<string>("1h");

  return (
    <ContentContainer gradientX={0.6}>
      <View style={styles.mainContentContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={globalStyles.title}>
          Get notified to{"\n"} stay hydrated
        </Text>

        <View style={styles.descriptionContainer}>
          <Text style={globalStyles.description}>
            Life can sometimes get the best of us, and it can be easy to forget
            to take a sip.
          </Text>
        </View>

        <GlassView
          isInteractive
          style={styles.glassView}
          glassEffectStyle="clear"
          tintColor="rgba(255, 255, 255, 0.25)"
        >
          <View style={styles.notificationContainer}>
            <Image source={appIcon} style={styles.appIcon} />
            <View style={styles.notificationContentContainer}>
              <Text style={styles.notificationTitle}>Sip</Text>
              <Text style={styles.notificationDescription}>
                Hey, friendly reminder to stop what you are doing and take a
                sip.
              </Text>
            </View>
            <Text style={styles.notificationTime}>Now</Text>
          </View>
        </GlassView>
      </View>
      <View>
        <View style={styles.pickerInputContainer}>
          <PickerInput
            values={FREQUENCIES}
            value={notiFrequency}
            setValue={setNotiFrequency}
            text="Every"
          />
        </View>

        <BigButton
          onPress={() => {
            router.navigate("/");
          }}
        >
          Allow and Save
        </BigButton>
      </View>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  mainContentContainer: {
    flex: 1,
  },
  backButton: {
    marginBottom: 42,
  },
  backText: {
    fontSize: 16,
    color: FOREGROUND,
  },
  descriptionContainer: {
    marginBottom: 32,
  },
  glassView: {
    borderRadius: 24,
  },
  notificationContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
  },
  appIcon: {
    height: 32,
    width: 32,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 14,
    fontFamily: "Lexend_400Regular",
    color: FOREGROUND,
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 12,
    fontFamily: "Lexend_400Regular",
    color: FOREGROUND,
  },
  notificationContentContainer: {
    flex: 1,
  },
  notificationTime: {
    fontSize: 10,
    color: MUTED_FOREGROUND,
    position: "absolute",
    top: 16,
    right: 24,
  },
  pickerInputContainer: {
    marginBottom: 48,
  },
});
