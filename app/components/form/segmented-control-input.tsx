import { FOREGROUND } from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { useCallback, useEffect, useRef } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const AnimatedGlassView = Animated.createAnimatedComponent(GlassView);

export default function SegmentedControlInput({
  options,
  selectedOption,
  setSelectedOption,
}: Props) {
  // string name of the option mapped to its layout x and width.
  const layouts = useRef<Record<string, { x: number; width: number }>>({});
  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const initialized = useRef(false);

  const animateTo = useCallback(
    (option: string, animate: boolean) => {
      const layout = layouts.current[option];
      if (!layout) return;
      if (animate) {
        translateX.value = withTiming(layout.x, { duration: 250 });
        indicatorWidth.value = withTiming(layout.width, { duration: 250 });
      } else {
        translateX.value = layout.x;
        indicatorWidth.value = layout.width;
      }
    },
    [translateX, indicatorWidth],
  );

  useEffect(() => {
    if (initialized.current) {
      // already initialised, animate
      animateTo(selectedOption, true);
    }
  }, [selectedOption, animateTo]);

  const handleOptionLayout = useCallback(
    (option: string, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      layouts.current[option] = { x, width };

      // Once all options are measured, set initial position without animation
      if (
        Object.keys(layouts.current).length === options.length &&
        !initialized.current
      ) {
        initialized.current = true;
        animateTo(selectedOption, false);
      }
    },
    [options.length, selectedOption, animateTo],
  );

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: indicatorWidth.value,
  }));

  return (
    <GlassView
      style={styles.container}
      glassEffectStyle="clear"
      tintColor="rgba(0, 0, 0, 0.25)"
      isInteractive
    >
      <AnimatedGlassView
        style={[styles.indicator, indicatorStyle]}
        glassEffectStyle="clear"
        tintColor="rgba(0, 0, 0, 0.2)"
      />
      {options.map((option) => (
        <Pressable
          key={option}
          style={styles.optionContainer}
          onLayout={(e) => handleOptionLayout(option, e)}
          onPress={() => setSelectedOption(option)}
        >
          <Text style={styles.text}>{option}</Text>
        </Pressable>
      ))}
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
  indicator: {
    position: "absolute",
    top: 5,
    height: "100%",
    borderRadius: 20,
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
});
