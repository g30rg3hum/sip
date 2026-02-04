import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ContentContainer from "@/components/content-container";
import { globalStyles } from "@/lib/constants/styles";
import BigButton from "@/components/big-button";
import { useRouter } from "expo-router";
import RadioInput from "@/components/form/radio-input";
import { FOREGROUND } from "@/lib/constants/colors";

const activityLevels = [
  { value: "sedentary", description: "no exercise" },
  { value: "light", description: "1-3 times a week" },
  { value: "moderate", description: "3-5 times a week" },
  { value: "high", description: "6-7 times a week" },
];
export default function OnboardingActivity() {
  const router = useRouter();
  const [activityLevel, setActivityLevel] = useState<string>("sedentary");

  return (
    <ContentContainer gradientX={0.8}>
      <View style={styles.mainContentContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={globalStyles.title}>How active are you?</Text>
        <RadioInput
          values={activityLevels}
          selectedValue={activityLevel}
          onValueChange={setActivityLevel}
        />
      </View>
      <BigButton
        onPress={() => {
          router.navigate("/(onboarding)/climate");
        }}
      >
        Continue
      </BigButton>
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
});
