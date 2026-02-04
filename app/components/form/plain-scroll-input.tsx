import { ACCENT, FOREGROUND, MUTED_FOREGROUND } from "@/lib/constants/colors";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const STEP_WIDTH = 48; // px between each value
let { width } = Dimensions.get("window");
width -= 56; // horizontal paddings of 28
const CENTER = width / 2;

const marker = require("@/assets/images/triangle.png");

interface Props {
  min: number;
  max: number;
  initial: number;
  units: string;
  onValueChange: (value: number) => void;
}
export default function PlainScrollInput({
  min,
  max,
  initial,
  units,
  onValueChange,
}: Props) {
  const [value, setValue] = useState(initial);

  function handleScroll(e: any) {
    // how many pixels the ScrollView has scrolled from starting position.
    const offsetX = Math.max(e.nativeEvent.contentOffset.x, 0);
    const idx = Math.round(offsetX / STEP_WIDTH);
    const clamped = Math.min(idx + min, max); // guard by max
    setValue(clamped);
    onValueChange?.(clamped);
  }

  const values = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <View style={styles.container}>
      <Text style={styles.unitsText}>{units}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={STEP_WIDTH}
        contentOffset={{
          x: (initial - min) * STEP_WIDTH,
          y: 0,
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{
          // Centerise
          paddingHorizontal: CENTER - STEP_WIDTH / 2,
        }}
        onScroll={handleScroll}
      >
        {values.map((val) => {
          const isValue = val === value;

          return (
            <View
              key={val}
              style={[
                styles.valContainer,
                { justifyContent: isValue ? "space-between" : "center" },
              ]}
            >
              <Text
                style={{
                  color: isValue ? ACCENT : FOREGROUND,
                  fontFamily: isValue ? "Lexend_700Bold" : "Lexend_400Regular",
                  fontSize: isValue ? 21 : 18,
                }}
              >
                {val}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <Image source={marker} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  unitsText: {
    fontSize: 18,
    color: MUTED_FOREGROUND,
    fontFamily: "Lexend_700Bold",
    marginBottom: 28,
  },
  valContainer: {
    width: STEP_WIDTH,
    alignItems: "center",
    height: 50,
  },
});
