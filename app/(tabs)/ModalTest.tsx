import { Button, Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export default function ModalTest() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Button title="닫기" onPress={() => {}}></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
