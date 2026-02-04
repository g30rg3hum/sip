import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ContentContainer from "@/components/content-container";
import { globalStyles } from "@/lib/constants/styles";
import TextInput from "@/components/form/text-input";
import BigButton from "@/components/big-button";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DANGER } from "@/lib/constants/colors";

export default function OnboardingName() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submitName = async (name: string) => {
    // validate: non-empty, only letters and spaces, max length 20
    name = name.trim();

    if (!name) {
      setError("Please fill the field in.");
      return { success: false };
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError("Only use letters and spaces.");
      return { success: false };
    }

    if (name.length > 20) {
      setError("Maximum 20 characters.");
      return { success: false };
    }

    try {
      await AsyncStorage.setItem("name", name);
    } catch (error) {
      console.error("Error saving name to AsyncStorage:", error);
      setError("An error occurred. Please contact support.");
      return { success: false };
    }

    setError("");
    return { success: true };
  };

  return (
    <ContentContainer>
      <View style={styles.mainContentContainer}>
        <Text style={globalStyles.title}>What&apos;s your name?</Text>
        <TextInput value={name} setValue={setName} placeholder="George" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
      <BigButton
        onPress={async () => {
          const { success } = await submitName(name);

          if (success) {
            router.navigate("/gender");
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
    paddingTop: 52,
  },
  errorText: {
    color: DANGER,
    marginTop: 8,
    fontFamily: "Lexend_400Regular",
  },
});
