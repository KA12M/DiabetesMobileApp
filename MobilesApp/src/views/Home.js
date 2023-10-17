import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { SafeArea } from "../utils/SafeArea";
import { theme } from "../infrastructure/theme/index";
import MyButton from "./MyButton";

export default function Home({ navigation }) {
  return (
    <SafeArea>
      <View style={styles.container}>
        <MyButton
          label="ประเมินระดับโรคเบาหวานด้วยม่านตา"
          iconName="eye"
          onPress={() => navigation.navigate("diabetes")}
        />
        <MyButton
          label="ประเมินระดับโรคเบาหวานด้วยม่านตา"
          iconName="eye"
          onPress={() => navigation.navigate("diabetes")}
        />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg.primary,
    gap: theme.space[2],
  },
});
