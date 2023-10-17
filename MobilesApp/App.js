import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

import Route from "./src/routes/route.js"; 

export default function App() {
  const [fontsLoaded] = useFonts({
    "Kanit-Medium": require("./assets/fonts/Kanit-Medium.ttf"),
  }); 

  const colorModeManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        console.log(e);
        return "light";
      }
    },
    set: async (value) => {
      try {
        await AsyncStorage.setItem("@color-mode", value);
      } catch (e) {
        console.log(e);
      }
    },
  };

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider colorModeManager={colorModeManager}>
      <Route />
    </NativeBaseProvider>
  );
}
