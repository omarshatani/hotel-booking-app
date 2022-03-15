import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Pressable, RegisteredStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text, TextInput, View, ViewProps } from "./Themed";

export default function Searchbar({
  filterVisible = true,
  containerStyle,
}: {
  filterVisible?: boolean;
  containerStyle?: RegisteredStyle<ViewProps & Record<never, number>>;
}) {
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.box}>
        <TextInput placeholder="Search" medium />
      </View>
      <Pressable
        android_ripple={{
          borderless: false,
        }}
        style={[
          styles.filterButton,
          { backgroundColor: Colors[colorScheme].primary },
        ]}
      >
        <FontAwesome5
          name="filter"
          size={15}
          color={Colors[colorScheme].background}
        />
      </Pressable>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 4,
    // marginHorizontal: "10@s",
  },
  box: {
    flexGrow: 1,
    paddingVertical: "10@vs",
    paddingHorizontal: "10@s",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "12@vs",
    paddingHorizontal: "12@s",
    borderRadius: 10,
    marginLeft: "10@s",
  },
  text: {
    fontSize: "12@s",
  },
});
