import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { KakaoPlaceType } from "../types/types";

export default function Detail() {
  const queryString = useLocalSearchParams();
  const kakaoPlace = JSON.parse(
    String(queryString?.kakaoPlace ?? "")
  ) as KakaoPlaceType;
  return (
    <ScrollView>
      <View>
        <Text>상세화면</Text>
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
