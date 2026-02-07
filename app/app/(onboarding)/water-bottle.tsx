import BigButton from "@/components/big-button";
import ContentContainer from "@/components/content-container";
import RulerScrollInput from "@/components/form/ruler-scroll-input";
import SegmentedControlInput from "@/components/form/segmented-control-input";
import { FOREGROUND } from "@/lib/constants/colors";
import { globalStyles } from "@/lib/constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function OnboardingWaterBottle() {
  const router = useRouter();

  const [capacity, setCapacity] = useState<number>(1500);
  const [unit, setUnit] = useState<string>("ml"); // or oz

  const submitCapacity = async () => {
    try {
      await AsyncStorage.setItem("waterBottleCapacity", capacity.toString());
      await AsyncStorage.setItem("waterBottleCapacityUnit", unit);
      return { success: true };
    } catch (error) {
      console.error(
        "Error saving water bottle capacity to AsyncStorage:",
        error,
      );
      return { success: false };
    }
  };

  return (
    <ContentContainer gradientX={0.6}>
      <View style={styles.mainContentContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={globalStyles.title}>
          What is the capacity of your water bottle?
        </Text>

        <View style={styles.segmentedControlInputContainer}>
          <SegmentedControlInput
            selectedOption={unit}
            setSelectedOption={setUnit}
            options={["ml", "oz"]}
          />
        </View>

        {unit === "ml" && (
          <RulerScrollInput
            min={250}
            max={3000}
            initial={1000}
            units="ml"
            onValueChange={setCapacity}
            markedIntervals={250}
          />
        )}

        {unit === "oz" && (
          <RulerScrollInput
            min={8}
            max={64}
            initial={16}
            units="oz"
            onValueChange={setCapacity}
            markedIntervals={4}
          />
        )}
      </View>
      <BigButton
        onPress={async () => {
          const { success } = await submitCapacity();

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
  segmentedControlInputContainer: {
    marginBottom: 28,
    marginLeft: "auto",
  },
});
