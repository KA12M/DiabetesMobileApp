import { StyleSheet } from "react-native";
import React from "react";
import { Button, Icon } from "native-base";
import MyText from "../components/MyText";
import { theme } from "../infrastructure/theme";
import { Entypo } from "@expo/vector-icons";

export default function MyButton({
  label,
  onPress,
  iconName,
  iconTemp = Entypo,
}) {
  return (
    <Button
      style={styles.btn}
      onPress={onPress}
      leftIcon={
        <Icon
          as={iconTemp}
          name={iconName}
          size="lg"
          color={theme.colors.bg.light}
        />
      }
    >
      <MyText
        label={label}
        fontSize={theme.sizes[1]}
        color={theme.colors.bg.light}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "80%",
    backgroundColor: "transparent",
    borderRadius: theme.space[4],
    borderColor: theme.colors.bg.light,
    padding: theme.space[2],
    borderWidth: theme.space[0],
  },
});
