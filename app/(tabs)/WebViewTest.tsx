/**
 * npx expo install react-native-webview
 */
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const { width } = Dimensions.get("window");

export default function WebViewTest() {
  return (
    <ScrollView>
      <View>
        <Text>웹뷰 예제</Text>
      </View>
      <View>
        <WebView source={{ uri: `naver.com` }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
