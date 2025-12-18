import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
}

export default function URLModal({
  visible,
  onClose,
  url = "",
  title = "상세 보기",
}: ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* 상단 헤더: 제목과 우측 닫기 버튼 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        {/* 웹뷰 영역 */}
        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: url }}
            style={styles.webview}
            startInLoadingState={true}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // 제목 중앙 정렬
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    position: "relative",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
