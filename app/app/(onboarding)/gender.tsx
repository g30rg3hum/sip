import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ContentContainer from "@/components/content-container";
import { globalStyles } from "@/lib/constants/styles";
import BigButton from "@/components/big-button";
import { useRouter } from "expo-router";
import RadioInput from "@/components/form/radio-input";
import { FOREGROUND } from "@/lib/constants/colors";

const genders = ["male", "female"];
export default function OnboardingGender() {
  const router = useRouter();
  const [gender, setGender] = useState<string>("male");

  return (
    <ContentContainer>
      <View style={styles.mainContentContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={globalStyles.title}>What&apos;s your gender?</Text>
        <RadioInput
          values={genders}
          selectedValue={gender}
          onValueChange={setGender}
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
