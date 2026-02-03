import { PRIMARY, PRIMARY_FOREGROUND } from "@/lib/constants/colors";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ContentContainer from "@/components/content-container";
import { globalStyles } from "@/lib/constants/styles";
import TextInput from "@/components/form/text-input";
import BigButton from "@/components/big-button";

export default function OnboardingName() {
  const [name, setName] = useState("");

  return (
    <ContentContainer>
      <View style={styles.mainContentContainer}>
        <Text style={globalStyles.title}>What&apos;s your name?</Text>
        <TextInput value={name} setValue={setName} placeholder="George" />
      </View>
      <BigButton>Continue</BigButton>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  mainContentContainer: {
    flex: 1,
  },
});
