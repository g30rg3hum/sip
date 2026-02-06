import { FOREGROUND } from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

export default function SegmentedControlInput({
  options,
  selectedOption,
  setSelectedOption,
}: Props) {
  return (
    <GlassView
      style={styles.container}
      glassEffectStyle="clear"
      tintColor="rgba(0, 0, 0, 0.25)"
      isInteractive
    >
      {options.map((option, key) => {
        if (option === selectedOption) {
          return (
            <GlassView
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.2)"
              key={key}
              style={[styles.optionContainer, styles.selectedOptionContainer]}
            >
              <Text style={styles.text}>{option}</Text>
            </GlassView>
          );
        }

        return (
          <Pressable
            key={key}
            style={styles.optionContainer}
            onPress={() => setSelectedOption(option)}
          >
            <Text style={styles.text}>{option}</Text>
          </Pressable>
        );
      })}
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    borderRadius: 24,
    padding: 5,
  },
  text: {
    color: FOREGROUND,
    fontFamily: "Lexend_400Regular",
    fontSize: 14,
  },
  optionContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectedOptionContainer: {
    borderRadius: 20,
  },
});
