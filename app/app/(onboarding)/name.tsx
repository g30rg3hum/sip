import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  BORDER,
  FOREGROUND,
  INPUT_GLASS,
  MUTED_FOREGROUND,
  PRIMARY,
  PRIMARY_FOREGROUND,
} from "@/lib/constants/colors";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlassView } from "expo-glass-effect";

import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";

export default function OnboardingName() {
  const [name, setName] = useState("");

  return (
    <View className="flex-1" style={styles.overallContainer}>
      <Svg
        height="100%"
        width="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <Defs>
          <RadialGradient
            id="radialGradient"
            gradientUnits="objectBoundingBox"
            cx={0.1}
            cy={-0.15}
            r={1.75}
          >
            <Stop offset="0" stopColor={BACKGROUND_LIGHT} stopOpacity={1} />
            <Stop offset="0.5" stopColor={BACKGROUND_LIGHT} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="50%" fill="url(#radialGradient)" />
      </Svg>
      {/* Applies the relevant padding. */}
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.mainContentContainer}>
          <Text style={styles.title}>What&apos;s your name?</Text>

          <GlassView
            isInteractive
            style={styles.inputGlassView}
            glassEffectStyle="regular"
          >
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              keyboardType="default"
              placeholder="George"
              onChangeText={setName}
              value={name}
              placeholderTextColor={MUTED_FOREGROUND}
            />
          </GlassView>
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK,
  },
  contentContainer: {
    flex: 1,
    color: FOREGROUND,
    paddingTop: 80,
    paddingHorizontal: 28,
  },
  mainContentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: FOREGROUND,
    textAlign: "center",
    fontFamily: "Lexend_700Bold",
    marginBottom: 32,
  },
  input: {
    fontSize: 14,
    height: 48,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 24,
    paddingHorizontal: 24,
    fontFamily: "Lexend_400Regular",
    color: FOREGROUND,
    backgroundColor: INPUT_GLASS,
    // opacity: 0.2,
  },
  inputGlassView: {
    borderRadius: 24,
  },
  button: {
    backgroundColor: PRIMARY,
    height: 56,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Lexend_700Bold",
    color: PRIMARY_FOREGROUND,
  },
});
