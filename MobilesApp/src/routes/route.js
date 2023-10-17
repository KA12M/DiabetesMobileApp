import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../views/Home";
import DiabetesCalculate from "../views/diabetes/DiabetesCalculate";
import { theme } from "../infrastructure/theme";
import IconButtons from "../components/IconButtons";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{}}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="diabetes"
          component={DiabetesCalculate}
          options={({ navigation }) => ({
            title: "Diabetes Level",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: theme.colors.bg.primary,
            },
            headerLeft: (props) => (
              <IconButtons onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color={theme.colors.text.light}
                />
              </IconButtons>
            ),
            headerRight: () => (
              <IconButtons onPress={() => navigation.goBack()}>
                <Feather
                  name="more-vertical"
                  size={24}
                  color={theme.colors.text.light}
                />
              </IconButtons>
            ),
            headerTintColor: theme.colors.text.light,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
