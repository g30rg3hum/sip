import { BORDER } from "@/lib/constants/colors";
import { StyleSheet, View } from "react-native";

const data = new Array(28).fill(0);

interface Props {
  columns: number;
  containerWidth: number;
}
export default function ActivityGraph({ columns, containerWidth }: Props) {
  const itemSize = containerWidth / columns;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    itemContainer: {
      width: itemSize,
      height: itemSize,
      backgroundColor: BORDER,
      margin: 4,
      borderRadius: 8,
    },
  });

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.itemContainer} />
      ))}
    </View>
  );
}
