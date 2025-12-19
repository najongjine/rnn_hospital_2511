import { useState } from "react";
import {
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ModalTest() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Modal></Modal>
      <ScrollView>
        <View>
          <Button
            title="닫기"
            onPress={() => {
              setModalVisible(false);
            }}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
