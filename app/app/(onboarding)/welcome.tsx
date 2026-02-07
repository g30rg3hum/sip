import ContentContainer from "@/components/content-container";
import { MUTED_FOREGROUND } from "@/lib/constants/colors";
import { globalStyles } from "@/lib/constants/styles";
import { Canvas, Fill, Group, Skia } from "@shopify/react-native-skia";
import { area, scaleLinear } from "d3";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenHeight, screenWidth } from "../(tabs)";
import BigButton from "@/components/big-button";

export default function OnboardingWelcome() {
  const router = useRouter();

  // TODO: dup code
  const translateXAnimated = useSharedValue(0);
  const translateYPercent = useSharedValue(0);

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
    translateYPercent.value = withTiming(0.5 * screenHeight, {
      duration: 1000,
    });
  }, [translateYPercent]);

  const waveCount = 1;
  const appliedWaveCount = waveCount + 1;
  const waveLength = screenWidth / waveCount;
  const allWavesLength = waveLength * appliedWaveCount;
  const waveHeight = 15;

  const waveScaleX = scaleLinear().range([0, allWavesLength]).domain([0, 1]);
  const waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]);

  const svgArea = area()
    .x((d) => waveScaleX(d[0]))
    // sine wave
    .y0((d) => waveScaleY(Math.sin(d[1] * 2 * Math.PI)))
    // fill the wave to the bottom
    .y1(() => screenHeight);

  const data: [number, number][] = [];
  for (let i = 0; i <= 40 * appliedWaveCount; i++) {
    data.push([i / (40 * appliedWaveCount), i / 40]);
  }

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
  }, [translateXAnimated, translateYPercent]);

  return (
    <ContentContainer gradientX={0.45} padding={false}>
      <Canvas style={styles.canvasContainer}>
        {wave && (
          <Group clip={wave}>
            <Fill color="rgb(47, 100, 129)" />
          </Group>
        )}
      </Canvas>
      <SafeAreaView style={styles.mainContentContainer}>
        <View>
          <Text style={globalStyles.title}>Welcome to Sip.</Text>

          <Text
            style={[
              globalStyles.description,
              { marginBottom: 24, fontFamily: "Lexend_700Bold" },
            ]}
          >
            A minimalistic hydration tracker that does exactly what you&apos;d
            expect.
          </Text>

          <Text style={globalStyles.description}>
            Let&apos;s start with a few questions to personalize your
            experience.
          </Text>
        </View>

        <BigButton
          onPress={() => {
            router.dismissAll();
            router.replace("/(onboarding)/name");
          }}
        >
          Get started
        </BigButton>
      </SafeAreaView>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  mainContentContainer: {
    flex: 1,
    paddingTop: 52 + 32,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  canvasContainer: {
    width: screenWidth,
    height: screenHeight,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  description: {
    color: MUTED_FOREGROUND,
    fontFamily: "Lexend_400Regular",
  },
});
