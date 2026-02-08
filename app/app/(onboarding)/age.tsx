import BigButton from "@/components/big-button";
import ContentContainer from "@/components/content-container";
import PlainScrollInput from "@/components/form/plain-scroll-input";
import { FOREGROUND } from "@/lib/constants/colors";
import { globalStyles } from "@/lib/constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function OnboardingAge() {
  const router = useRouter();

  const [age, setAge] = useState<number>(21);

  const submitAge = async () => {
    try {
      await AsyncStorage.setItem("age", age.toString());
      return { success: true };
    } catch (error) {
      console.error("Error saving age to AsyncStorage:", error);
      return { success: false };
    }
  };

  return (
    <ContentContainer gradientX={0.35}>
      <View style={styles.mainContentContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={globalStyles.title}>How old are you?</Text>

        <PlainScrollInput
          min={1}
          max={100}
          initial={21}
          units="years"
          onValueChange={setAge}
          value={age}
        />
      </View>
      <BigButton
        onPress={async () => {
          const { success } = await submitAge();

          if (success) {
            router.navigate("/(onboarding)/height");
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
