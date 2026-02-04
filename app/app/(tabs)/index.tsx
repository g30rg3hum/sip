import ContentContainer from "@/components/content-container";
import {
  Canvas,
  Fill,
  Group,
  Skia,
  Text,
  useFont,
} from "@shopify/react-native-skia";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import { area, scaleLinear } from "d3";
import { ACCENT, BORDER, FOREGROUND } from "@/lib/constants/colors";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlassView } from "expo-glass-effect";
import { SymbolView } from "expo-symbols";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const translateXAnimated = useSharedValue(0);
  const translateYPercent = useSharedValue(0);

  const minValue = 0;
  const maxValue = 100;
  const value = 53;
  // can't go lower than min value
  // and can't go higher than max
  const fillPercent = Math.max(minValue, Math.min(maxValue, value)) / maxValue;

  useEffect(() => {
    translateXAnimated.value = withRepeat(
      withTiming(1, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  useEffect(() => {
    translateYPercent.value = withTiming(fillPercent * screenHeight, {
      duration: 1000,
    });
  }, [fillPercent, translateYPercent]);

  const waveCount = 1;
  // extra wave for animation
  // length of 1 wave
  const appliedWaveCount = waveCount + 1;
  const waveLength = screenWidth / waveCount; // use normal wave count that is being shown
  // console.log(waveLength);
  const allWavesLength = waveLength * appliedWaveCount;
  const waveHeight = 15;

  // generate 40 data points per wave
  const data: [number, number][] = [];
  for (let i = 0; i <= 40 * appliedWaveCount; i++) {
    // x and y values between 0 and 1
    data.push([i / (40 * appliedWaveCount), i / 40]);
  }

  // interpolate 0 and 1 into actual pixel wave values.
  const waveScaleX = scaleLinear().range([0, allWavesLength]).domain([0, 1]);
  const waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]);

  // will pass in data
  const svgArea = area()
    .x((d) => waveScaleX(d[0]))
    // sine wave
    .y0((d) => waveScaleY(Math.sin(d[1] * 2 * Math.PI)))
    // fill the wave to the bottom
    .y1(() => screenHeight);

  const waveSvgPath = svgArea(data);

  const wave = useDerivedValue(() => {
    const path = Skia.Path.MakeFromSVGString(waveSvgPath!);
    const transformMatrix = Skia.Matrix();

    transformMatrix.translate(
      // move one wave
      -waveLength * translateXAnimated.value,
      screenHeight - translateYPercent.value,
    );
    path?.transform(transformMatrix);
    return path ?? Skia.Path.Make();
  }, [translateXAnimated]);

  const fontSize = 64;
  const font = useFont(require("@/assets/fonts/Lexend_700Bold.ttf"), fontSize);

  const text = value.toString();
  const textWidth = font?.getTextWidth(text) ?? 0;
  const textTranslateX = screenWidth / 2 - textWidth / 2;

  return (
    <ContentContainer padding={false}>
      <GlassView
        isInteractive
        glassEffectStyle="clear"
        tintColor="rgba(23, 23, 23, 0.75)"
        style={[styles.addButton, { bottom: 16 + insets.bottom }]}
      >
        <Pressable onPress={() => router.push("/add-drink")}>
          <SymbolView
            name="plus"
            style={styles.plusSymbol}
            tintColor={FOREGROUND}
          />
        </Pressable>
      </GlassView>

      <Canvas style={{ flex: 1 }}>
        <Text
          text={text}
          font={font}
          color={FOREGROUND}
          x={textTranslateX}
          y={screenHeight / 2}
        />
        {wave && (
          <Group clip={wave}>
            <Fill color="rgb(47, 100, 129)" />
            <Text
              text={text}
              font={font}
              color={ACCENT}
              x={textTranslateX}
              y={screenHeight / 2}
            />
          </Group>
        )}
      </Canvas>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 26,
    borderRadius: 25,
    padding: 10,
    overflow: "hidden",
    zIndex: 10,
  },
  plusSymbol: {
    width: 24,
    height: 24,
  },
});
