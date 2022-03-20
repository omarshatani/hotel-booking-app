import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { Platform, Pressable, RegisteredStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { Text, TextInput, View, ViewProps } from "./Themed";

export default function Searchbar({
  filterVisible = true,
  containerStyle,
  navigation,
}: {
  filterVisible?: boolean;
  containerStyle?: RegisteredStyle<ViewProps & Record<never, number>>;
} & NativeStackHeaderProps) {
  const colorScheme = useColorScheme();
  const handleSeach = (text: string) => {
    navigation.setParams({
      query: text,
    });
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.box, styles.shadow]}>
        <TextInput placeholder="Search" medium onChangeText={handleSeach} />
      </View>
      {filterVisible && (
        <Pressable
          android_ripple={{
            borderless: false,
          }}
          style={[
            styles.filterButton,
            styles.shadow,
            { backgroundColor: Colors.light.primary },
          ]}
        >
          <FontAwesome5
            name="filter"
            size={15}
            color={Colors[colorScheme].background}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 4,
  },
  box: {
    flexGrow: 1,
    paddingVertical: "10@vs",
    paddingHorizontal: "10@s",
    borderRadius: 10,
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
  shadow: {
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
});
