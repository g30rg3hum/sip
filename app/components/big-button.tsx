import { PRIMARY, PRIMARY_FOREGROUND } from "@/lib/constants/colors";
import { Pressable, StyleSheet, Text } from "react-native";

export default function BigButton({ children }: { children: React.ReactNode }) {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY,
    height: 56,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: "Lexend_700Bold",
    color: PRIMARY_FOREGROUND,
  },
});
