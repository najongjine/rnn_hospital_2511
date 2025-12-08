import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [categories, setCategories] = useState<string[]>([
    "이비인후과",
    "내과",
    "성형외과",
    "신경과",
    "안과",
    "정형외과",
    "피부과",
  ]);
  let a = {};

  return (
    <ScrollView>
      <View>
        <Text>홈화면</Text>
      </View>
      <View>
        {/* 보여지는곳(tag) 에서 프로그래밍을 하고싶다?
         { }   대괄호 써야함 
        categories?.length && := categories 데이터 있니?
        있으면 categories 를 forloop 처리해서 보여줘
             */}
        {categories?.length &&
          categories.map((item) => {
            /* categories 에서 하나 꺼내서 item에 담고,
            <View>{item}</View> 요런식으로 보여줘라
             */
            return <View>{item}</View>;
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
