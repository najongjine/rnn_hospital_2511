import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { KakaoPlaceType } from "../types/types";

export default function Detail() {
  // ... (이전 코드와 동일: 데이터 파싱 및 에러 처리) ...
  const queryString = useLocalSearchParams();
  const kakaoPlace = queryString?.kakaoPlace
    ? (JSON.parse(String(queryString.kakaoPlace)) as KakaoPlaceType)
    : null;

  if (!kakaoPlace) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>병원 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const handleCall = () => {
    if (kakaoPlace.phone) Linking.openURL(`tel:${kakaoPlace.phone}`);
  };

  const handleOpenWeb = () => {
    if (kakaoPlace.place_url) Linking.openURL(kakaoPlace.place_url);
  };

  // 지도 URL
  const mapUrl = `https://map.kakao.com`;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. 헤더 섹션 (동일) */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>{kakaoPlace.place_name}</Text>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {kakaoPlace.distance
                ? `${kakaoPlace.distance}m`
                : "거리 정보 없음"}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. 액션 버튼 (동일) */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={handleCall}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.callButtonText}>전화 걸기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.webButton]}
          onPress={handleOpenWeb}
          activeOpacity={0.8}
        >
          <Ionicons name="globe-outline" size={20} color="#333" />
          <Text style={styles.webButtonText}>홈페이지</Text>
        </TouchableOpacity>
      </View>

      {/* 3. 상세 정보 리스트 (동일) */}
      <View style={styles.infoSection}>
        {/* ... (기존 infoRow 코드들 동일) ... */}
        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="location-outline" size={22} color="#666" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>주소</Text>
            <Text style={styles.infoValue}>{kakaoPlace.address_name}</Text>
          </View>
        </View>
        {/* ... */}
      </View>

      {/* 4. [수정됨] 지도 보기 섹션 (웹/앱 분기 처리) */}
      <View style={styles.mapSection}>
        <Text style={styles.sectionTitle}>위치 확인</Text>
        <View style={styles.mapContainer}>
          {Platform.OS === "web" ? (
            // [웹일 경우] iframe 사용
            <iframe
              src={mapUrl}
              style={{ width: "100%", height: "100%", border: "none" }}
              title="hospital-map"
            />
          ) : (
            // [앱일 경우] WebView 사용
            <WebView
              source={{ uri: mapUrl }}
              style={{ flex: 1 }}
              nestedScrollEnabled={true}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

// ... styles는 기존과 동일 ...
const styles = StyleSheet.create({
  // ... 기존 스타일 그대로 유지 ...
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { color: "#666", fontSize: 16 },
  headerSection: { marginBottom: 24 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  badgeContainer: { flexDirection: "row" },
  badge: {
    backgroundColor: "#EBF5FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { color: "#2563EB", fontSize: 13, fontWeight: "600" },
  actionRow: { flexDirection: "row", gap: 12, marginBottom: 32 },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  callButton: { backgroundColor: "#2563EB" },
  callButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  webButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  webButtonText: { color: "#374151", fontSize: 16, fontWeight: "600" },
  infoSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 32, // 지도와의 간격 추가
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 4,
  },
  iconContainer: {
    width: 24,
    marginRight: 16,
    marginTop: 2,
    alignItems: "center",
  },
  infoTextContainer: { flex: 1 },
  infoLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2,
    fontWeight: "500",
  },
  infoValue: { fontSize: 16, color: "#1F2937", lineHeight: 22 },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 16 },

  // [추가됨] 지도 관련 스타일
  mapSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
    marginLeft: 4, // 살짝 들여쓰기
  },
  mapContainer: {
    height: 300, // 지도가 보일 높이 지정 (필수)
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    overflow: "hidden", // 둥근 모서리 적용을 위해 필수
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
