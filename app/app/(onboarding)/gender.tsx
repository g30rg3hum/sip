import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ContentContainer from "@/components/content-container";
import { globalStyles } from "@/lib/constants/styles";
import BigButton from "@/components/big-button";
import { useRouter } from "expo-router";
import RadioInput from "@/components/form/radio-input";
import { FOREGROUND } from "@/lib/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const genders = [
  { value: "male", description: undefined },
  { value: "female", description: undefined },
];
export default function OnboardingGender() {
  const router = useRouter();
  const [gender, setGender] = useState<string>("male");

  const submitGender = async (gender: string) => {
    try {
      await AsyncStorage.setItem("gender", gender);
      return { success: true };
    } catch (error) {
      console.error("Error saving gender to AsyncStorage:", error);
      return { success: false };
    }
  };

  return (
    <ContentContainer gradientX={0.8}>
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
      <BigButton
        onPress={async () => {
          const { success } = await submitGender(gender);
          if (success) {
            return router.navigate("/(onboarding)/height");
          }
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
    fontFamily: "Lexend_400Regular",

    color: FOREGROUND,
  },
});
