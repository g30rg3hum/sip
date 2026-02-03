import {
  ACCENT,
  BORDER,
  FOREGROUND,
  INPUT_GLASS,
} from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  values: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}
export default function RadioInput({
  values,
  selectedValue,
  onValueChange,
}: Props) {
  return (
    <View style={styles.container}>
      {values.map((value, key) => (
        <GlassView isInteractive style={styles.glassView} key={key}>
          <Pressable
            style={styles.radioButton}
            onPress={() => onValueChange(value)}
          >
            <Text style={styles.valueText}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Text>
            <View
              style={[
                styles.circle,
                selectedValue === value && styles.circleActive,
              ]}
            />
          </Pressable>
        </GlassView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  glassView: {
    borderRadius: 24,
  },
  radioButton: {
    height: 48,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 24,
    paddingHorizontal: 24,
    backgroundColor: INPUT_GLASS,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  valueText: {
    fontSize: 14,
    fontFamily: "Lexend_400Regular",
    color: FOREGROUND,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: BORDER,
  },
  circleActive: {
    backgroundColor: ACCENT,
  },
});
