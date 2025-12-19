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
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ScrollView>
          <View>
            <Button
              title="닫기"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </ScrollView>
      </Modal>

      <View>
        <Button
          title="모달창 열기"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
