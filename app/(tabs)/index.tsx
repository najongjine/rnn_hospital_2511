import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [categories, setCategories] = useState<string[]>([
    "이비인후과",
    "내과",
    "성형외과",
    "신경과",
    "안과",
    "정형외과",
    "피부과",
  ]);
  return (
    <ScrollView>
      <View>
        <Text>홈화면</Text>
      </View>
      <View></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
