import {
  ACCENT,
  BORDER,
  FOREGROUND,
  INPUT_GLASS,
  MUTED_FOREGROUND,
} from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

interface Props {
  setValue: (text: string) => void;
  value: string;
  values: string[];
  text: string;
}
export default function PickerInput({ setValue, value, values, text }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {open && (
        <Pressable onPress={() => setOpen(false)} style={styles.backOverlay} />
      )}
      {open && (
        <GlassView isInteractive style={styles.popup} glassEffectStyle="clear">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {values.map((val) => (
                <Pressable
                  key={val}
                  onPress={() => {
                    setValue(val);
                    setOpen(false);
                  }}
                  style={styles.pickerItem}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      val === value && styles.pickerItemTextSelected,
                    ]}
                  >
                    {val}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </GlassView>
      )}

      <GlassView
        isInteractive
        style={styles.glassView}
        glassEffectStyle="regular"
      >
        <Pressable
          style={styles.buttonContainer}
          onPress={() => setOpen(!open)}
        >
          <Text style={styles.label}>{text}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{value}</Text>
            <View style={styles.valueTriangles}>
              <View style={styles.valueTopTriangle} />
              <View style={styles.valueBottomTriangle} />
            </View>
          </View>
        </Pressable>
      </GlassView>
      {/* <Modal visible={open} animationType="slide"></Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  backOverlay: {
    position: "absolute",
    top: -1000,
    bottom: -1000,
    left: -1000,
    right: -1000,
    zIndex: -1,
  },
  container: {
    position: "relative",
    zIndex: 10,
  },
  popup: {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    width: "50%",
    backgroundColor: "rgb(64, 77, 100, 0.05)",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 24,
    marginBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 20,
    maxHeight: 180,
    overflow: "hidden",
    zIndex: 30,
  },
  glassView: {
    borderRadius: 24,
  },
  buttonContainer: {
    fontSize: 14,
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
  label: {
    fontFamily: "Lexend_400Regular",
    color: MUTED_FOREGROUND,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  valueText: {
    fontFamily: "Lexend_400Regular",
    color: FOREGROUND,
  },
  valueTriangles: {
    gap: 8,
  },
  valueTopTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: BORDER,
  },
  valueBottomTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: BORDER,
  },
  pickerItem: {
    paddingVertical: 12,
  },
  pickerItemText: {
    fontFamily: "Lexend_400Regular",
    fontSize: 16,
    color: FOREGROUND,
    textAlign: "center",
  },
  pickerItemTextSelected: {
    fontFamily: "Lexend_700Bold",
    color: ACCENT,
    fontSize: 18,
  },
});
