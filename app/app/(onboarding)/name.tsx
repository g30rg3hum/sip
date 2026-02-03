import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ContentContainer from "@/components/content-container";
import { globalStyles } from "@/lib/constants/styles";
import TextInput from "@/components/form/text-input";
import BigButton from "@/components/big-button";
import { useRouter } from "expo-router";

export default function OnboardingName() {
  const router = useRouter();
  const [name, setName] = useState("");

  return (
    <ContentContainer>
      <View style={styles.mainContentContainer}>
        <Text style={globalStyles.title}>What&apos;s your name?</Text>
        <TextInput value={name} setValue={setName} placeholder="George" />
      </View>
      <BigButton onPress={() => router.navigate("/gender")}>Continue</BigButton>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  mainContentContainer: {
    flex: 1,
    paddingTop: 52,
  },
});
