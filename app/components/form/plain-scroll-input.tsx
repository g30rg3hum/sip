import { ACCENT, FOREGROUND, MUTED_FOREGROUND } from "@/lib/constants/colors";
import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";

const STEP_WIDTH = 48; // px between each value
let { width } = Dimensions.get("window");
width -= 56; // horizontal paddings of 28
const CENTER = width / 2;

const marker = require("@/assets/images/triangle.png");

interface Props {
  min: number;
  max: number;
  initial: number;
  units: string;
  onValueChange: (value: number) => void;
  value: number;
}
export default function PlainScrollInput({
  min,
  max,
  initial,
  units,
  onValueChange,
  value,
}: Props) {
  // values are in 1 increments
  // maintained across re-renders
  const values = useRef(
    Array.from({ length: max - min + 1 }, (_, i) => i + min),
  ).current;

  // returns the same function reference unless deps change
  // regular function would see a new prop passed in if regular function
  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      // for some reason, the center is off, and its actually the start
      const center = viewableItems[0];
      if (center?.item != null) {
        onValueChange?.(center.item);
      }
    },
    [onValueChange],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: STEP_WIDTH, // length of the item
      offset: STEP_WIDTH * index, // offset from start of list to start of item
      index, // index of the item
    }),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: number }) => (
      <View style={styles.valContainer}>
        <Text style={item === value ? styles.activeText : styles.inactiveText}>
          {item}
        </Text>
      </View>
    ),
    [value], // only rerender if becomes inactive/active due to value.
  );

  return (
    <View style={styles.container}>
      <Text style={styles.unitsText}>{units}</Text>
      <FlatList
        data={values}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={STEP_WIDTH}
        initialScrollIndex={initial - min}
        getItemLayout={getItemLayout}
        contentContainerStyle={{
          paddingHorizontal: CENTER - STEP_WIDTH / 2,
        }}
        onViewableItemsChanged={handleViewableItemsChanged}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        windowSize={5} // max items rendered outside of window
      />
      <Image source={marker} />
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
  valContainer: {
    width: STEP_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  activeText: {
    color: ACCENT,
    fontFamily: "Lexend_700Bold",
    fontSize: 21,
  },
  inactiveText: {
    color: FOREGROUND,
    fontFamily: "Lexend_400Regular",
    fontSize: 18,
  },
});
