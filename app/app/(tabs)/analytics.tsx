import ContentContainer from "@/components/content-container";
import ActivityGraph from "@/components/viz/activity-graph";
import { ACCENT, FOREGROUND, MUTED_FOREGROUND } from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
// 28 padding content container
// 24 padding card container
// margins on left and right of item; 4; extra little spacing to support smaller devices wrapping earlier.
const activityGraphWidth = windowWidth - 28 * 2 - 24 * 2 - 4.5 * 2 * 7 - 4 * 2;

export default function Analytics() {
  // workaround
  // glass effect issues when navigating first time to screen (due to native tabs)
  const [glassReady, setGlassReady] = useState(false);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      // during idle periods; after all high prio work like naimations has finished.
      requestIdleCallback(() => {
        setGlassReady(true);
      });
      return () => {
        setGlassReady(false);
      };
    }, []),
  );

  const CardWrapper = glassReady ? GlassView : View;
  const glassProps = glassReady
    ? {
        isInteractive: true,
        glassEffectStyle: "clear" as const,
        tintColor: "rgba(0, 0, 0, 0.25)",
      }
    : {};

  const regularContainerStyle = {
    backgroundColor: "#1A1C21",
    borderWidth: 1,
    borderColor: "#272A34",
  };

  return (
    <ContentContainer gradientX={0.45} padding={false}>
      <SafeAreaView edges={["bottom"]}>
        <ScrollView
          style={[styles.scrollViewContainer, { paddingTop: insets.top + 32 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <CardWrapper
              {...glassProps}
              style={[
                styles.cardContainer,
                !glassReady && regularContainerStyle,
              ]}
            >
              <Text style={styles.cardTitle}>Current streak</Text>
              <Text style={[styles.cardStat, { color: ACCENT }]}>
                🔥 10 days
              </Text>
            </CardWrapper>

            <CardWrapper
              {...glassProps}
              style={[
                styles.cardContainer,
                !glassReady && regularContainerStyle,
              ]}
            >
              <Text style={styles.cardTitle}>Longest streak</Text>
              <Text style={styles.cardStat}> 14 days</Text>
            </CardWrapper>

            <CardWrapper
              {...glassProps}
              style={[
                styles.cardContainer,
                !glassReady && regularContainerStyle,
              ]}
            >
              <Text style={styles.cardTitle}>February 2025</Text>
              <Text style={styles.cardDescription}>14/28</Text>
              <ActivityGraph columns={7} containerWidth={activityGraphWidth} />
            </CardWrapper>

            <Link href="/(onboarding)/welcome">Temp</Link>
            <Link href="/(onboarding)/name">Temp2</Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: 28,
  },
  container: {
    gap: 24,
  },
  cardContainer: {
    paddingVertical: 32,
    borderRadius: 36,
    paddingHorizontal: 24,
    // borderWidth: 1,
    // borderColor: BORDER,
    gap: 14,
    // overflow: "hidden",
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: "Lexend_700Bold",
    color: FOREGROUND,
    textAlign: "center",
  },
  cardStat: {
    fontSize: 24,
    fontFamily: "Lexend_700Bold",
    color: FOREGROUND,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: "Lexend_400Regular",
    color: MUTED_FOREGROUND,
    textAlign: "center",
  },
});
