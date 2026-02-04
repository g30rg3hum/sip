import ContentContainer from "@/components/content-container";
import ActivityGraph from "@/components/viz/activity-graph";
import { ACCENT, FOREGROUND, MUTED_FOREGROUND } from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { Link } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const windowWidth = Dimensions.get("window").width;
// 28 padding content container
// 24 padding card container
// margins on left and right of item; 4
const activityGraphWidth = windowWidth - 28 * 2 - 24 * 2 - 4 * 2 * 7;

export default function Analytics() {
  return (
    <ContentContainer gradientX={0.45}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>
          <GlassView
            isInteractive
            style={styles.cardContainer}
            glassEffectStyle="clear"
            tintColor="rgba(0, 0, 0, 0.25)"
          >
            <Text style={styles.cardTitle}>Current streak</Text>
            <Text style={[styles.cardStat, { color: ACCENT }]}>🔥 10 days</Text>
          </GlassView>

          <GlassView
            isInteractive
            style={styles.cardContainer}
            glassEffectStyle="clear"
            tintColor="rgba(0, 0, 0, 0.25)"
          >
            <Text style={styles.cardTitle}>Longest streak</Text>
            <Text style={styles.cardStat}> 14 days</Text>
          </GlassView>

          <GlassView
            isInteractive
            style={styles.cardContainer}
            glassEffectStyle="clear"
            tintColor="rgba(0, 0, 0, 0.25)"
          >
            <Text style={styles.cardTitle}>February 2025</Text>
            <Text style={styles.cardDescription}>14/28</Text>
            <ActivityGraph columns={7} containerWidth={activityGraphWidth} />
          </GlassView>
        </View>

        <Link href="/(onboarding)/name">Temp</Link>
      </ScrollView>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    overflow: "visible",
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
