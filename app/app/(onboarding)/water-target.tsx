import BigButton from "@/components/big-button";
import ContentContainer from "@/components/content-container";
import { ACCENT, FOREGROUND } from "@/lib/constants/colors";
import { calculateWaterTargetFromStorage } from "@/lib/helpers/water-goal";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const MESSAGES = [
  "Calculating your water intake target...",
  "Processing inputs...",
  "Analysing your lifestyle...",
  "Finishing up calculations...",
  "Your daily water intake target is:",
];

const FADE_DURATION = 500;
const DISPLAY_DURATION = 2000;

export default function OnboardingWaterTarget() {
  const router = useRouter();

  const [messageIndex, setMessageIndex] = useState(0);
  const [waterTarget, setWaterTarget] = useState<number>(2500);
  const opacity = useSharedValue(0);
  const intakeOpacity = useSharedValue(0);
  const intakeScale = useSharedValue(0.5);

  const animatedIntakeStyle = useAnimatedStyle(() => ({
    opacity: intakeOpacity.value,
    transform: [{ scale: intakeScale.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: intakeOpacity.value,
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    setTimeout(
      () => {
        intakeOpacity.value = withTiming(1, { duration: FADE_DURATION });
        intakeScale.value = withTiming(1, { duration: FADE_DURATION });
      },
      FADE_DURATION * 2 * (MESSAGES.length - 1) +
        DISPLAY_DURATION * (MESSAGES.length - 1),
    );
  }, []);

  useEffect(() => {
    // calculate the water target at the start
    async function getAndStoreWaterTarget() {
      const target = await calculateWaterTargetFromStorage();
      setWaterTarget(target);
    }

    getAndStoreWaterTarget();
  }, []);

  useEffect(() => {
    // Fade in
    opacity.value = withTiming(1, { duration: FADE_DURATION });

    const timeout = setTimeout(() => {
      // stop on the last one.
      if (messageIndex < MESSAGES.length - 1) {
        // Fade out
        opacity.value = withTiming(0, { duration: FADE_DURATION });
        // Switch text after fade out completes

        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        }, FADE_DURATION);
      }
    }, DISPLAY_DURATION);

    return () => clearTimeout(timeout);
  }, [messageIndex]); // run when message changes

  return (
    <ContentContainer>
      <Stack.Screen options={{ gestureEnabled: false }} />
      <View style={styles.contentContainer}>
        <Animated.Text style={[styles.text, animatedStyle]}>
          {MESSAGES[messageIndex]}
        </Animated.Text>
        <Animated.Text
          style={[styles.text, animatedIntakeStyle, styles.targetText]}
        >
          {waterTarget} ml
        </Animated.Text>
      </View>
      <BigButton
        onPress={() => {
          router.dismissAll();
          router.replace("/(onboarding)/water-bottle");
        }}
        style={animatedButtonStyle}
      >
        Continue
      </BigButton>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Lexend_400Regular",
    color: FOREGROUND,
    fontSize: 16,
    marginBottom: 24,
  },
  targetText: {
    fontFamily: "Lexend_700Bold",
    color: ACCENT,
    fontSize: 32,
  },
});
