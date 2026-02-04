import {
  ACCENT,
  BORDER,
  FOREGROUND,
  INPUT_GLASS,
} from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Value {
  value: string;
  description: string | undefined;
}

interface Props {
  values: Value[];
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
        <GlassView
          isInteractive
          style={styles.glassView}
          glassEffectStyle="clear"
          tintColor="rgba(0, 0, 0, 0.25)"
          key={key}
        >
          <Pressable
            style={styles.radioButton}
            onPress={() => onValueChange(value.value)}
          >
            <Text style={styles.valueText}>
              {value.value.charAt(0).toUpperCase() + value.value.slice(1)}{" "}
              {value.description && `(${value.description})`}
            </Text>
            <View
              style={[
                styles.circle,
                selectedValue === value.value && styles.circleActive,
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
    // borderWidth: 1,
    // borderColor: BORDER,
    borderRadius: 24,
    paddingHorizontal: 24,
    // backgroundColor: INPUT_GLASS,
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
