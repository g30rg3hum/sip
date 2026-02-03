import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  FOREGROUND,
} from "@/lib/constants/colors";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

export default function ContentContainer({
  gradientX = 0.1,
  children,
}: {
  children: React.ReactNode;
  gradientX?: number;
}) {
  return (
    <View className="flex-1" style={styles.overallContainer}>
      <Svg
        height="100%"
        width="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <Defs>
          <RadialGradient
            id="radialGradient"
            gradientUnits="objectBoundingBox"
            cx={gradientX}
            cy={-0.15}
            r={1.75}
          >
            <Stop offset="0" stopColor={BACKGROUND_LIGHT} stopOpacity={1} />
            <Stop offset="0.5" stopColor={BACKGROUND_LIGHT} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="50%" fill="url(#radialGradient)" />
      </Svg>
      {/* Applies the relevant padding. */}
      <SafeAreaView style={styles.contentContainer}>{children}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK,
  },
  contentContainer: {
    flex: 1,
    color: FOREGROUND,
    paddingTop: 32,
    paddingHorizontal: 28,
  },
});
