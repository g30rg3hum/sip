import ContentContainer from "@/components/content-container";
import { FOREGROUND, MUTED_FOREGROUND } from "@/lib/constants/colors";
import { GlassView } from "expo-glass-effect";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const router = useRouter();

  return (
    <ContentContainer gradientX={0.9}>
      <View style={styles.container}>
        <GlassView
          isInteractive
          style={styles.glassView}
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
        </GlassView>
        <GlassView
          isInteractive
          style={styles.glassView}
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
        </GlassView>
        <GlassView
          isInteractive
          style={styles.glassView}
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
        </GlassView>
        <GlassView
          isInteractive
          style={styles.glassView}
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
        </GlassView>
        <GlassView
          isInteractive
          style={styles.glassView}
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
        </GlassView>
        <GlassView
          isInteractive
          style={styles.glassView}
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
        </GlassView>
        <GlassView
          isInteractive
          style={styles.glassView}
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
        </GlassView>
        <GlassView
          isInteractive
          style={styles.glassView}
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
        </GlassView>
        <GlassView
          isInteractive
          style={styles.glassView}
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
        </GlassView>
      </View>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  glassView: {
    borderRadius: 24,
  },
  container: {
    gap: 24,
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
});
