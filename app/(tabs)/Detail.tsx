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
      <View>
        <Text>병원이름 : {kakaoPlace?.place_name}</Text>
        <Text>병원주소 : {kakaoPlace?.address_name}</Text>
        <Text>거리 : {kakaoPlace?.distance}m</Text>
        <Text>전화번호 : {kakaoPlace?.phone}</Text>
        <Text>홈페이지 : {kakaoPlace?.place_url}</Text>
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
