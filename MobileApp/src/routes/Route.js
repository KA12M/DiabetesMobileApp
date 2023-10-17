 
import { AntDesign, Feather } from "@expo/vector-icons";  
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../views/home/HomeScreen";
import UploadScreen from "../views/upload-screen/UploadScreen";
import AccountScreen from "../views/AccountScreen";

import { MyTabBar } from "./MyTabBar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => (
        <MyTabBar {...props} nameTH={["หน้าหลัก", "ผู้ใช้"]} />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, ...rest }) => (
            <AntDesign name="home" {...rest} />
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, ...rest }) => (
            <Feather name="user" {...rest} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="main"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="main" component={MyTabs} />
        <Stack.Screen name="upload" component={UploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
