import { View, Text, Linking } from "react-native";
import { Button } from "native-base";
import { Center } from "native-base";

import { SafeArea } from "../utils/SafeArea";

const AccountScreen = () => {
  return (
    <SafeArea>
      <View style={{marginTop: 20}}>
        <Center>
          <Button width={"50%"} onPress={() => Linking.openSettings()}>
            ตั้งค่า
          </Button>
        </Center>
      </View>
    </SafeArea>
  );
};

export default AccountScreen;
