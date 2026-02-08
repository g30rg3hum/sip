import ContentContainer from "@/components/content-container";
import { FOREGROUND, MUTED_FOREGROUND } from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { useFocusEffect, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Settings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [glassReady, setGlassReady] = useState(false);

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
        borderRadius: 24,
        alignSelf: "stretch" as const,
      }
    : {};

  const regularContainerStyle = {
    backgroundColor: "#1A1C21",
    borderWidth: 1,
    borderColor: "#272A34",
    borderRadius: 24,
    alignSelf: "stretch" as const,
  };

  return (
    <ContentContainer gradientX={0.9} padding={false}>
      <SafeAreaView
        edges={{ bottom: "additive" }}
        style={{ paddingBottom: 15 }}
      >
        <ScrollView
          style={{
            paddingTop: insets.top + 32,
            paddingHorizontal: 28,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.header}>About</Text>
            <CardWrapper
              isInteractive
              {...glassProps}
              style={!glassReady && regularContainerStyle}
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.25)"
            >
              <Pressable
                style={styles.buttonContainer}
                onPress={() => router.push("/change-name")}
              >
                <View style={styles.leftContainer}>
                  <SymbolView
                    name="person"
                    style={styles.icon}
                    tintColor={FOREGROUND}
                  />
                  <Text style={styles.buttonText}>Name</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.buttonValue}>George</Text>
                  <SymbolView
                    name="chevron.right"
                    style={styles.chevronIcon}
                    tintColor={FOREGROUND}
                  />
                </View>
              </Pressable>
            </CardWrapper>
            <CardWrapper
              isInteractive
              {...glassProps}
              style={!glassReady && regularContainerStyle}
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.25)"
            >
              <Pressable style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <SymbolView
                    name="figure"
                    style={styles.icon}
                    tintColor={FOREGROUND}
                  />
                  <Text style={styles.buttonText}>Gender</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.buttonValue}>Male</Text>
                  <SymbolView
                    name="chevron.right"
                    style={styles.chevronIcon}
                    tintColor={FOREGROUND}
                  />
                </View>
              </Pressable>
            </CardWrapper>
            <CardWrapper
              isInteractive
              {...glassProps}
              style={!glassReady && regularContainerStyle}
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.25)"
            >
              <Pressable style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <SymbolView
                    name="ruler"
                    style={styles.icon}
                    tintColor={FOREGROUND}
                  />
                  <Text style={styles.buttonText}>Height</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.buttonValue}>167 cm</Text>
                  <SymbolView
                    name="chevron.right"
                    style={styles.chevronIcon}
                    tintColor={FOREGROUND}
                  />
                </View>
              </Pressable>
            </CardWrapper>
            <CardWrapper
              isInteractive
              {...glassProps}
              style={!glassReady && regularContainerStyle}
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.25)"
            >
              <Pressable style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <SymbolView
                    name="scalemass"
                    style={styles.icon}
                    tintColor={FOREGROUND}
                  />
                  <Text style={styles.buttonText}>Weight</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.buttonValue}>67 kg</Text>
                  <SymbolView
                    name="chevron.right"
                    style={styles.chevronIcon}
                    tintColor={FOREGROUND}
                  />
                </View>
              </Pressable>
            </CardWrapper>

            <View style={styles.separator} />

            <Text style={[styles.header, { marginTop: -8 }]}>Lifestyle</Text>

            <CardWrapper
              isInteractive
              {...glassProps}
              style={!glassReady && regularContainerStyle}
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.25)"
            >
              <Pressable style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <SymbolView
                    name="figure.run"
                    style={styles.icon}
                    tintColor={FOREGROUND}
                  />
                  <Text style={styles.buttonText}>Activity</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.buttonValue}>Sedentary</Text>
                  <SymbolView
                    name="chevron.right"
                    style={styles.chevronIcon}
                    tintColor={FOREGROUND}
                  />
                </View>
              </Pressable>
            </CardWrapper>
            <CardWrapper
              isInteractive
              {...glassProps}
              style={!glassReady && regularContainerStyle}
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.25)"
            >
              <Pressable style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <SymbolView
                    name="sun.min"
                    style={styles.icon}
                    tintColor={FOREGROUND}
                  />
                  <Text style={styles.buttonText}>Climate</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.buttonValue}>Cold</Text>
                  <SymbolView
                    name="chevron.right"
                    style={styles.chevronIcon}
                    tintColor={FOREGROUND}
                  />
                </View>
              </Pressable>
            </CardWrapper>
            <CardWrapper
              isInteractive
              {...glassProps}
              style={!glassReady && regularContainerStyle}
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.25)"
            >
              <Pressable style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <SymbolView
                    name="waterbottle"
                    style={styles.icon}
                    tintColor={FOREGROUND}
                  />
                  <Text style={styles.buttonText}>Water bottle</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.buttonValue}>1.5L</Text>
                  <SymbolView
                    name="chevron.right"
                    style={styles.chevronIcon}
                    tintColor={FOREGROUND}
                  />
                </View>
              </Pressable>
            </CardWrapper>

            <View style={styles.separator} />

            <Text style={[styles.header, { marginTop: -8 }]}>Preferences</Text>

            <CardWrapper
              isInteractive
              {...glassProps}
              style={!glassReady && regularContainerStyle}
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.25)"
            >
              <Pressable style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <SymbolView
                    name="target"
                    style={styles.icon}
                    tintColor={FOREGROUND}
                  />
                  <Text style={styles.buttonText}>Target</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.buttonValue}>1.5L</Text>
                  <SymbolView
                    name="chevron.right"
                    style={styles.chevronIcon}
                    tintColor={FOREGROUND}
                  />
                </View>
              </Pressable>
            </CardWrapper>
            <CardWrapper
              isInteractive
              {...glassProps}
              style={!glassReady && regularContainerStyle}
              glassEffectStyle="clear"
              tintColor="rgba(0, 0, 0, 0.25)"
            >
              <Pressable style={styles.buttonContainer}>
                <View style={styles.leftContainer}>
                  <SymbolView
                    name="bell.badge"
                    style={styles.icon}
                    tintColor={FOREGROUND}
                  />
                  <Text style={styles.buttonText}>Notifications</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.buttonValue}>1h</Text>
                  <SymbolView
                    name="chevron.right"
                    style={styles.chevronIcon}
                    tintColor={FOREGROUND}
                  />
                </View>
              </Pressable>
            </CardWrapper>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  glassView: {
    borderRadius: 24,
  },
  container: {
    gap: 24,
    alignItems: "center",
  },
  header: {
    alignSelf: "flex-start",
    fontFamily: "Lexend_700Bold",
    fontSize: 20,
    color: FOREGROUND,
  },
  icon: {
    width: 20,
    height: 20,
  },
  chevronIcon: {
    width: 16,
    height: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 24,
    height: 48,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontFamily: "Lexend_700Bold",
    color: FOREGROUND,
  },
  leftContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  buttonValue: {
    fontFamily: "Lexend_400Regular",
    color: MUTED_FOREGROUND,
  },
  separator: {
    height: 1,
    borderWidth: 1,
    width: "50%",
    paddingHorizontal: "auto",
    borderColor: "#272A34",
    marginVertical: 12,
  },
});
