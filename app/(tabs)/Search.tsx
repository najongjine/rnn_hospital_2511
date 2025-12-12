import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Search() {
  const apiUrl = process.env.EXPO_PUBLIC_HONO_API_BASEURL;
  const queryString = useLocalSearchParams();
  const category = queryString?.category ?? "";

  async function getHospital() {
    const params = new URLSearchParams();
    params.append("query", String(category)); // 사용자 검색어
    params.append("x", x); // longitute
    params.append("y", y); // langitute

    const response = await fetch(`${apiUrl}?${params}`, {
      method: "GET",
      headers: {},
    });

    let _data = await response.json();
  }

  useFocusEffect(
    useCallback(() => {
      // return (
      // 	//화면에서 포커싱이 떠났을 때 실행시킬 내용을 작성
      // );
    }, [category])
  );

  return (
    <ScrollView>
      <View>
        <Text>검색화면, 넘겨받은 데이터: {category}</Text>
      </View>
      <View>
        <TextInput placeholder="검색어 입력" />
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
