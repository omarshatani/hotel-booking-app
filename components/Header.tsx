import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import Avatar from "./Avatar";
import Searchbar from "./Seachbar";
import { Text, View } from "./Themed";
import { RootTabScreenProps } from "../types";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export default function Header(props: NativeStackHeaderProps) {
  return (
    <SafeAreaView style={style.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text bold style={style.welcomeText}>
            Welcome buddy
          </Text>
          <Text style={style.helpText}>Let's start looking for hotels!</Text>
        </View>
        <Avatar />
      </View>
      <Searchbar containerStyle={style.searchBarStyle} {...props} />
    </SafeAreaView>
  );
}

const style = ScaledSheet.create({
  container: {
    paddingHorizontal: "20@s",
    backgroundColor: Colors.light.background,
  },
  welcomeText: {
    fontSize: "16@s",
    color: Colors.light.primary,
  },
  helpText: {
    fontSize: "12@s",
    fontWeight: "bold",
    color: Colors.light.helpText,
  },
  searchBarStyle: {
    marginVertical: "10@vs",
  },
});
