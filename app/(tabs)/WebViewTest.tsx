/**
 * npx expo install react-native-webview
 */
import { Dimensions, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const { width } = Dimensions.get("window");

export default function WebViewTest() {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text>웹뷰 예제</Text>
      </View>

      {/* 이제 WebView가 남은 공간을 모두 차지합니다 */}
      <WebView source={{ uri: `https://m.naver.com` }} style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({});
