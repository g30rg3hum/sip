import { PRIMARY, PRIMARY_FOREGROUND } from "@/lib/constants/colors";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  onPress?: () => void;
  children: React.ReactNode;
}
export default function BigButton({ onPress, children }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
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
    zIndex: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: "Lexend_700Bold",
    color: PRIMARY_FOREGROUND,
  },
});
