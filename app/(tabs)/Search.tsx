import * as Location from "expo-location";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { KakaoPlaceType } from "../types/types";

export default function Search() {
  const apiUrl = process.env.EXPO_PUBLIC_HONO_API_BASEURL;
  const queryString = useLocalSearchParams();
  const category = String(queryString?.category ?? "");
  /** longitute : x, latitute : y */
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [kakaoPlace, setKakaoPlace] = useState<KakaoPlaceType[]>([]);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    if (category && location) {
      await getHospital(category, location);
    }
  }

  async function getHospital(
    query: string = "",
    location: Location.LocationObject | null = null
  ) {
    const params = new URLSearchParams();
    params.append("query", String(query)); // 사용자 검색어
    params.append("x", String(location?.coords?.longitude ?? "")); // longitute
    params.append("y", String(location?.coords?.latitude ?? "")); // langitute

    const response = await fetch(`${apiUrl}/api/hospital?${params}`, {
      method: "GET",
      headers: {},
    });

    let _data = await response.json();
    console.log(`get hospital _data: `, _data);
  }

  useFocusEffect(
    useCallback(() => {
      getCurrentLocation();
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
        <Text>{errorMsg}</Text>
      </View>
      <View>
        <Text>{JSON.stringify(location)}</Text>
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
