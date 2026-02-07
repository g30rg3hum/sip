import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import RadioInput from "@/components/form/radio-input";
import TextInput from "@/components/form/text-input";
import BigButton from "@/components/big-button";
import { globalStyles } from "@/lib/constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_AMOUNT_OPTIONS: {
  value: string;
  description: string | undefined;
}[] = [
  { value: "250ml", description: undefined },
  { value: "500ml", description: undefined },
  { value: "1L", description: undefined },
];

export default function AddDrink() {
  const insets = useSafeAreaInsets();
  const [selectedAmount, setSelectedAmount] = useState("250ml");
  const [customAmount, setCustomAmount] = useState("");
  const [amountOptions, setAmountOptions] = useState([
    ...DEFAULT_AMOUNT_OPTIONS,
    { value: "Custom", description: undefined },
  ]);

  // get water bottle amount
  useEffect(() => {
    const fetchWaterBottleAmount = async () => {
      try {
        const value = await AsyncStorage.getItem("waterBottleCapacity");
        const units = await AsyncStorage.getItem("waterBottleCapacityUnit");

        if (!value || !units) return;

        if (units === "ml") {
          setAmountOptions([
            ...DEFAULT_AMOUNT_OPTIONS,
            {
              value:
                Number(value) > 1000
                  ? `${Number(value) / 1000}L`
                  : `${value}ml`,
              description: "Your water bottle",
            },
            { value: "Custom", description: undefined },
          ]);
        }

        // TODO: configure for oz
      } catch {
        console.error("Failed to fetch water bottle capacity");
      }
    };

    fetchWaterBottleAmount();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top + 32 }]}>
      <View>
        <Text style={globalStyles.title}>Record Drink</Text>

        <View style={styles.form}>
          <RadioInput
            values={amountOptions}
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
