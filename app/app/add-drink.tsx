import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import RadioInput from "@/components/form/radio-input";
import TextInput from "@/components/form/text-input";
import BigButton from "@/components/big-button";
import { FOREGROUND } from "@/lib/constants/colors";
import { globalStyles } from "@/lib/constants/styles";

const AMOUNT_OPTIONS = [
  { value: "250ml", description: undefined },
  { value: "500ml", description: undefined },
  { value: "1L", description: undefined },
  { value: "Custom", description: undefined },
];

export default function AddDrink() {
  const insets = useSafeAreaInsets();
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top + 32 }]}>
      <View>
        <Text style={globalStyles.title}>Record Drink</Text>

        <View style={styles.form}>
          <RadioInput
            values={AMOUNT_OPTIONS}
            selectedValue={selectedAmount}
            onValueChange={setSelectedAmount}
          />

          {selectedAmount === "Custom" && (
            <TextInput
              value={customAmount}
              setValue={setCustomAmount}
              placeholder="Custom amount (ml)"
              keyboardType="numeric"
            />
          )}
        </View>
      </View>

      <BigButton onPress={() => {}}>Record</BigButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  form: {
    gap: 24,
  },
});
