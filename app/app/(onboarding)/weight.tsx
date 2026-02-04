import BigButton from "@/components/big-button";
import ContentContainer from "@/components/content-container";
import PlainScrollInput from "@/components/form/plain-scroll-input";
import { FOREGROUND } from "@/lib/constants/colors";
import { globalStyles } from "@/lib/constants/styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function OnboardingWeight() {
  const router = useRouter();

  const [weight, setWeight] = useState<number>(170);

  return (
    <ContentContainer gradientX={0.6}>
      <View style={styles.mainContentContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={globalStyles.title}>How heavy are you?</Text>
        <PlainScrollInput
          min={45}
          max={125}
          initial={70}
          units="kg"
          onValueChange={setWeight}
        />
      </View>
      <BigButton onPress={() => {}}>Continue</BigButton>
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
