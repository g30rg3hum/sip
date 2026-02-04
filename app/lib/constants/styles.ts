import { StyleSheet } from "react-native";
import { FOREGROUND, MUTED_FOREGROUND } from "./colors";

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: FOREGROUND,
    textAlign: "center",
    fontFamily: "Lexend_700Bold",
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    fontFamily: "Lexend_400Regular",
    color: MUTED_FOREGROUND,
    textAlign: "center",
  },
});
