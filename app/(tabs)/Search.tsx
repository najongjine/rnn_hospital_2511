import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Search() {
  const queryString = useLocalSearchParams();
  const category = queryString?.category ?? "";

  useFocusEffect(
    useCallback(() => {
      //화면이 포커싱 되었을 때 실행시킬 내용을 작성
      // return (
      // 	//화면에서 포커싱이 떠났을 때 실행시킬 내용을 작성
      // );
    }, [])
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
