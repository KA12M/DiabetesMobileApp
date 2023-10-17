import { View, TouchableOpacity, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const MyTabBar = ({ state, descriptors, navigation, nameTH }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 9,
        backgroundColor: "white",
        borderTopWidth: 0.5,
        borderColor: "transparent",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: insets.bottom + 4,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const TabBarIcon = options.tabBarIcon;
        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(route.name)}
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <TabBarIcon
              focused={isFocused}
              color={isFocused ? "#001FE5" : "#8D8D8D"}
              size={36}
            />
            {isFocused && (
              <View
                style={{
                  height: 5,
                  width: 68,
                  backgroundColor: "#001FE5",
                  position: "absolute",
                  top: -9,
                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
                }}
              />
            )}
            <Text
              style={{
                fontSize: 18,
                color: isFocused ? "#001FE5" : "#8D8D8D",
              }}
            >
              {nameTH[index]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
