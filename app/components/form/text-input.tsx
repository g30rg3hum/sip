import {
  BORDER,
  FOREGROUND,
  INPUT_GLASS,
  MUTED_FOREGROUND,
} from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { StyleSheet } from "react-native";
import { KeyboardTypeOptions, TextInput as RNTextInput } from "react-native";

interface Props {
  setValue: (text: string) => void;
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}
export default function TextInput({ setValue, value, placeholder, keyboardType = "default" }: Props) {
  return (
    <GlassView
      isInteractive
      style={styles.glassView}
      glassEffectStyle="regular"
    >
      <RNTextInput
        style={styles.input}
        autoCapitalize="words"
        keyboardType={keyboardType}
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
        placeholderTextColor={MUTED_FOREGROUND}
      />
    </GlassView>
  );
}

const styles = StyleSheet.create({
  glassView: {
    borderRadius: 24,
  },
  input: {
    fontSize: 14,
    height: 48,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 24,
    paddingHorizontal: 24,
    fontFamily: "Lexend_400Regular",
    color: FOREGROUND,
    backgroundColor: INPUT_GLASS,
  },
});
