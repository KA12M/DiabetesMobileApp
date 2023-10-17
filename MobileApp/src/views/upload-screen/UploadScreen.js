import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AppBar } from "@react-native-material/core";

import { SafeArea } from "../../utils/SafeArea";
import { useStore } from "../../store/store";

const UploadScreen = ({ navigation }) => {
  const {
    commonStore: { loading, handleCalculate, dataResponse, clearResponse },
  } = useStore();

  return (
    <SafeArea>
      <AppBar title="๊Check diabetes level" />

      <View style={styles.content}>{/* <Image source={}/>  */}</View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
});

export default UploadScreen;
