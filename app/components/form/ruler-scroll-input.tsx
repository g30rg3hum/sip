import { ACCENT, FOREGROUND, MUTED_FOREGROUND } from "@/lib/constants/colors";
import { convertInchesIntoFeetAndInches } from "@/lib/helpers/metrics";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

let { width } = Dimensions.get("window");
width -= 56; // horizontal paddings of 28
const CENTER = width / 2;

interface Props {
  min: number;
  max: number;
  initial: number;
  units: "cm" | "inches" | "oz" | "ml";
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

  let STEP_WIDTH = 34; // px between each tick
  if (units === "ml") {
    STEP_WIDTH = 45;
  }

  function handleScroll(e: any) {
    // how many pixels the ScrollView has scrolled from starting position.
    const offsetX = Math.max(e.nativeEvent.contentOffset.x, 0);
    // console.log(offsetX);
    const idx = Math.round(offsetX / STEP_WIDTH);
    // console.log(idx);
    let clamped = Math.min(idx + min, max); // guard by max
    if (units === "ml") {
      clamped = Math.min(idx * 50 + min, max);
    }
    setValue(clamped);
    onValueChange?.(clamped);
  }

  // for ml, every step is 50ml
  const ticks = Array.from(
    { length: units === "ml" ? (max - min) / 50 + 1 : max - min + 1 },
    (_, i) => {
      return units === "ml" ? i * 50 + min : i + min;
    },
  );

  let text;
  if (units === "cm") {
    text = `${value} cm`;
  } else if (units === "inches") {
    text = convertInchesIntoFeetAndInches(value);
  } else if (units === "oz") {
    text = `${value} oz`;
  } else if (units === "ml") {
    if (value >= 1000) {
      text = `${value / 1000} L`;
    } else {
      text = `${value} ml`;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.unitsText}>{text}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={STEP_WIDTH}
        contentOffset={{
          x:
            units === "ml"
              ? ((initial - min) / 50) * STEP_WIDTH
              : (initial - min) * STEP_WIDTH,
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

          let markerText;
          if (units === "cm") {
            markerText = `${tick}`;
          } else if (units === "inches") {
            markerText = convertInchesIntoFeetAndInches(tick);
          } else if (units === "oz") {
            markerText = `${tick}`;
          } else if (units === "ml") {
            if (tick >= 1000) {
              markerText = `${tick / 1000} L`;
            } else {
              markerText = `${tick}`;
            }
          }

          return (
            <View
              key={tick}
              style={[styles.tickContainer, { width: STEP_WIDTH }]}
            >
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
                  numberOfLines={1}
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
