import { PRIMARY, PRIMARY_FOREGROUND } from "@/lib/constants/colors";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}
export default function BigButton({ onPress, children, style }: Props) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(1.1, { duration: 200 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
    onPress?.();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.button, style, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={styles.text}>{children}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY,
    height: 56,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    zIndex: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: "Lexend_700Bold",
    color: PRIMARY_FOREGROUND,
  },
});
