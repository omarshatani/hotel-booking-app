import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ImageBackground, Platform } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "./Themed";

export default function SmallCard({
  gallery,
  name,
  location,
  userRating,
}: any) {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: gallery[0] }}>
        <View style={styles.box}>
          <FontAwesome name="star" color="#fcba03" size={12} />
          <Text
            semibold
            style={{ fontSize: 10, textAlign: "right", color: "#fcba03" }}
          >
            {userRating}
          </Text>
        </View>
      </ImageBackground>
      <View>
        <Text medium>{name}</Text>
        <Text light style={{ fontSize: 12, color: "grey" }}>
          {location.address}
        </Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "250@s",
    borderRadius: 10,
    padding: "10@s",
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
    }),
  },
  image: {
    overflow: "hidden",
    position: "relative",
    borderRadius: 10,
    width: "100%",
    height: "250@vs",
    marginBottom: "8@vs",
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: -1,
    borderBottomLeftRadius: 4,
    width: "35@s",
    padding: "5@s",
  },
});
