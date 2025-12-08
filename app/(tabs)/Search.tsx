import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Search() {
  const queryString = useLocalSearchParams();
  const category = queryString?.category ?? "";
  return (
    <ScrollView>
      <View>
        <Text>검색화면</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
