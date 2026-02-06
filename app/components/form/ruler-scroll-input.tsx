import { ACCENT, FOREGROUND, MUTED_FOREGROUND } from "@/lib/constants/colors";
import { convertInchesIntoFeetAndInches } from "@/lib/helpers/metrics";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const STEP_WIDTH = 34; // px between each tick
let { width } = Dimensions.get("window");
width -= 56; // horizontal paddings of 28
const CENTER = width / 2;

interface Props {
  min: number;
  max: number;
  initial: number;
  units: "cm" | "inches";
  markedIntervals: number;
  onValueChange: (value: number) => void;
}
export default function RulerScrollInput({
  min,
  max,
  initial,
  units,
  markedIntervals,
  onValueChange,
}: Props) {
  const [value, setValue] = useState(initial);

  function handleScroll(e: any) {
    // how many pixels the ScrollView has scrolled from starting position.
    const offsetX = Math.max(e.nativeEvent.contentOffset.x, 0);
    // console.log(offsetX);
    const idx = Math.round(offsetX / STEP_WIDTH);
    // console.log(idx);
    const clamped = Math.min(idx + min, max); // guard by max
    setValue(clamped);
    onValueChange?.(clamped);
  }

  const ticks = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  const text =
    units === "cm" ? `${value} cm` : convertInchesIntoFeetAndInches(value);

  return (
    <View style={styles.container}>
      <Text style={styles.unitsText}>{text}</Text>
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
        {ticks.map((tick) => {
          const isMarked = tick % markedIntervals === 0;
          const isValue = tick === value;

          const markerText =
            units === "cm" ? `${tick}` : convertInchesIntoFeetAndInches(tick);

          return (
            <View key={tick} style={styles.tickContainer}>
              {/* The line */}
              <View
                style={[
                  styles.line,
                  {
                    height: isMarked ? 50 : 30,
                    backgroundColor: isValue ? ACCENT : FOREGROUND,
                  },
                ]}
              />
              {/* Marker */}
              {isMarked && (
                <Text
                  style={[
                    styles.markerText,
                    {
                      color: isValue ? ACCENT : FOREGROUND,
                      fontFamily: isValue
                        ? "Lexend_700Bold"
                        : "Lexend_400Regular",
                    },
                  ]}
                >
                  {markerText}
                </Text>
              )}
            </View>
          );
        })}
      </ScrollView>
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
  tickContainer: {
    width: STEP_WIDTH,
    alignItems: "center",
    overflow: "visible",
  },
  line: {
    width: 5,
    borderRadius: 5,
    marginBottom: 24,
  },
  markerText: {
    fontSize: 16,
  },
});
