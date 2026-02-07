import BigButton from "@/components/big-button";
import ContentContainer from "@/components/content-container";
import { MUTED_FOREGROUND, SUCCESS } from "@/lib/constants/colors";
import { globalStyles } from "@/lib/constants/styles";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SymbolView } from "expo-symbols";

export default function OnboardingFinish() {
  return (
    <ContentContainer>
      <View style={styles.mainContentContainer}>
        <Text style={globalStyles.title}>You&apos;re all set.</Text>
        <Text style={styles.text}>
          Click finish to start tracking{"\n"} your water intake.
        </Text>
        <SymbolView
          name="checkmark.circle.fill"
          style={styles.checkSymbol}
          tintColor={SUCCESS}
        />
      </View>
      <BigButton
        onPress={() => {
          router.dismissAll();
          router.replace("/");
        }}
      >
        Finish
      </BigButton>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  mainContentContainer: {
    flex: 1,
    paddingTop: 52 + 32,
  },
  text: {
    fontSize: 16,
    color: MUTED_FOREGROUND,
    fontFamily: "Lexend_400Regular",
    textAlign: "center",
    marginBottom: 64,
  },
  checkSymbol: {
    width: 64,
    height: 64,
    marginHorizontal: "auto",
  },
});
