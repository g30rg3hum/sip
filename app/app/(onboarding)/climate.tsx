import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ContentContainer from "@/components/content-container";
import { globalStyles } from "@/lib/constants/styles";
import BigButton from "@/components/big-button";
import { useRouter } from "expo-router";
import RadioInput from "@/components/form/radio-input";
import { FOREGROUND } from "@/lib/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const climates = [
  { value: "cold", description: undefined },
  { value: "temperate", description: undefined },
  { value: "tropical", description: undefined },
];
export default function OnboardingClimate() {
  const router = useRouter();
  const [climate, setClimate] = useState<string>("temperate");

  const submitClimate = async (climate: string) => {
    try {
      await AsyncStorage.setItem("climate", climate);
      return { success: true };
    } catch (error) {
      console.error("Error saving climate to AsyncStorage:", error);
      return { success: false };
    }
  };

  return (
    <ContentContainer gradientX={0.8}>
      <View style={styles.mainContentContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={globalStyles.title}>What climate do you live in?</Text>
        <RadioInput
          values={climates}
          selectedValue={climate}
          onValueChange={setClimate}
        />
      </View>
      <BigButton
        onPress={async () => {
          const { success } = await submitClimate(climate);

          if (success) {
            router.navigate("/(onboarding)/notifications");
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
