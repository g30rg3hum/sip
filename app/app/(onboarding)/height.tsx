import BigButton from "@/components/big-button";
import ContentContainer from "@/components/content-container";
import RulerScrollInput from "@/components/form/ruler-scroll-input";
import { FOREGROUND } from "@/lib/constants/colors";
import { globalStyles } from "@/lib/constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function OnboardingHeight() {
  const router = useRouter();

  const [height, setHeight] = useState<number>(170);

  const submitHeight = async (height: number) => {
    try {
      await AsyncStorage.setItem("height", height.toString());
      return { success: true };
    } catch (error) {
      console.error("Error saving height to AsyncStorage:", error);
      return { success: false };
    }
  };

  return (
    <ContentContainer gradientX={0.3}>
      <View style={styles.mainContentContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={globalStyles.title}>How tall are you?</Text>
        <RulerScrollInput
          min={120}
          max={200}
          initial={170}
          onValueChange={setHeight}
          markedIntervals={5}
          units={"cm"}
        />
      </View>
      <BigButton
        onPress={async () => {
          const { success } = await submitHeight(height);

          if (success) {
            router.navigate("/(onboarding)/weight");
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
    color: FOREGROUND,
  },
});
