import * as Location from "expo-location";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KakaoPlaceType } from "../types/types";

export default function Search() {
  const apiUrl = process.env.EXPO_PUBLIC_HONO_API_BASEURL;
  const queryString = useLocalSearchParams();
  const searchKeyword = String(queryString?.searchKeyword ?? "");
  /** longitute : x, latitute : y */

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [kakaoPlace, setKakaoPlace] = useState<KakaoPlaceType[]>([]);

  // 1. **검색어 상태 추가**
  const [searchText, setSearchText] = useState<string>(searchKeyword ?? "");

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    if (searchKeyword && location) {
      await getHospital(searchKeyword, location);
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
    setKakaoPlace(_data?.data);
  }

  async function onSearch() {
    /** 검색 버튼 누르면, 검색된 병원 나오게 하기 */
    alert(`onSearch : ${searchText}`);
    getHospital(searchText, location);
  }

  useFocusEffect(
    useCallback(() => {
      getCurrentLocation();
      // return (
      // 	//화면에서 포커싱이 떠났을 때 실행시킬 내용을 작성
      // );
    }, [searchKeyword])
  );

  return (
    <ScrollView>
      <View>
        <Text>검색화면, 넘겨받은 데이터: {searchText} </Text>
      </View>
      <View>
        <Text>lat: {location?.coords.latitude} </Text>
        <Text>long: {location?.coords.longitude} </Text>
      </View>
      <View>
        <Text>{errorMsg}</Text>
      </View>
      <View>
        {/* 2. **TextInput에 검색어 상태 연결** */}
        <TextInput
          placeholder="검색어 입력"
          value={searchText}
          onChangeText={setSearchText} // 입력될 때마다 searchText 업데이트
        />
        <Button title="검색" onPress={onSearch} />
      </View>
      <View>
        {kakaoPlace?.length &&
          kakaoPlace.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  router.push({
                    pathname: "/Detail",
                    params: { kakaoPlace: JSON.stringify(item) },
                  });
                }}
              >
                <View key={index}>
                  {/* 목록 누르면 detail 페이지로 가는데, item?.id 도 같이 보내세요  */}
                  <Text>
                    {item?.place_name}, &nbsp;&nbsp;
                    {`${item?.distance}m`},&nbsp;&nbsp;
                    {item?.road_address_name}
                  </Text>
                  <Text> </Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
