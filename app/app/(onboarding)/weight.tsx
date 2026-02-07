import BigButton from "@/components/big-button";
import ContentContainer from "@/components/content-container";
import PlainScrollInput from "@/components/form/plain-scroll-input";
import SegmentedControlInput from "@/components/form/segmented-control-input";
import { FOREGROUND } from "@/lib/constants/colors";
import { globalStyles } from "@/lib/constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function OnboardingWeight() {
  const router = useRouter();

  const [weight, setWeight] = useState<number>(170);
  const [unit, setUnit] = useState<string>("kg"); // or pounds

  const submitWeight = async () => {
    try {
      await AsyncStorage.setItem("weight", weight.toString());
      await AsyncStorage.setItem("weightUnit", unit);
      return { success: true };
    } catch (error) {
      console.error("Error saving weight to AsyncStorage:", error);
      return { success: false };
    }
  };

  return (
    <ContentContainer gradientX={0.6}>
      <View style={styles.mainContentContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={globalStyles.title}>How heavy are you?</Text>

        <View style={styles.segmentedControlInputContainer}>
          <SegmentedControlInput
            selectedOption={unit}
            setSelectedOption={setUnit}
            options={["kg", "pounds"]}
          />
        </View>

        {unit === "pounds" && (
          <PlainScrollInput
            min={65}
            max={330}
            initial={135}
            units="pounds"
            onValueChange={setWeight}
          />
        )}

        {unit === "kg" && (
          <PlainScrollInput
            min={30}
            max={150}
            initial={70}
            units="kg"
            onValueChange={setWeight}
          />
        )}
      </View>
      <BigButton
        onPress={async () => {
          const { success } = await submitWeight();

          if (success) {
            router.navigate("/(onboarding)/activity");
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
  segmentedControlInputContainer: {
    marginBottom: 28,
    marginLeft: "auto",
  },
});
