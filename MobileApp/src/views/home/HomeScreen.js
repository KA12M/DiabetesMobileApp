import { useState } from "react";
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Button,
  Box,
  Heading,
  Actionsheet,
  useDisclose,
  Spacer,
  HStack,
  Center,
  ScrollView,
  VStack,
  useToast,
  Icon,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
 
import { SafeArea } from "../../utils/SafeArea";
import ResponseData from "./ResponseData";
import { useStore } from "./../../store/store";
import { observer } from "mobx-react-lite";

const HomeScreen = () => {
  const {
    commonStore: {
      loading, 
      handleCalculate,
      dataResponse,
      clearResponse,
    },
  } = useStore();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclose();
  const [image, setImage] = useState(null); 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) setPhoto(result);
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) setPhoto(result);
  };

  const setPhoto = async (result) => {
    setImage(result.assets[0].uri);
    onClose();
  };

  const clear = async () => {
    setImage(null);
    clearResponse();
    toast.show({ title: "ลบทั้งหมด", duration: 1000, placement: "top" });
  };

  return (
    <SafeArea>
      <Box backgroundColor={"#001FE5"} padding={6}>
        <Heading size="xl" ml="-1" color="white">
          MobileApp
        </Heading>
      </Box>
      <ScrollView>
        <Center padding={8}>
          <TouchableOpacity onPress={onOpen} activeOpacity={0.7}>
            <Image
              borderRadius={12}
              style={{ width: 360, height: 370 }}
              source={
                image
                  ? { uri: image }
                  : require("../../../assets/gallery-icon.jpg")
              }
              alt="image"
              size="xl"
            />
          </TouchableOpacity>
        </Center>

        <ResponseData data={dataResponse} />

        <VStack space={3} marginBottom={4} alignItems={"center"}>
          <Button
            leftIcon={<Icon as={AntDesign} name="sync" size="lg" />}
            isDisabled={!image}
            isLoading={loading}
            width={"65%"}
            size="lg"
            onPress={() => handleCalculate(image)}
          >
            ประมวลผล
          </Button>

          <Button
            leftIcon={<Icon as={FontAwesome} name="remove" size="lg" />}
            isDisabled={!image}
            width={"65%"}
            size="lg"
            onPress={clear}
          >
            ล้างข้อมูล
          </Button>
        </VStack>

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item onPress={pickImage}>
              <HStack space={[2, 3]} justifyContent="space-between">
                <MaterialIcons name="photo-library" size={36} color="#001FE5" />
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Kanit-Medium",
                    color: "#001FE5",
                  }}
                >
                  อัลบัม
                </Text>
                <Spacer />
              </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item onPress={takePhoto}>
              <HStack space={[2, 3]} justifyContent="space-between">
                <MaterialIcons name="photo-camera" size={36} color="#001FE5" />
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Kanit-Medium",
                    color: "#001FE5",
                  }}
                >
                  ถ่ายรูป
                </Text>
                <Spacer />
              </HStack>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({});

export default observer(HomeScreen);
