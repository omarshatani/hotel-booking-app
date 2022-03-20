import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ImageBackground, Platform, Pressable } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Hotel } from "../types";
import { Text, View } from "./Themed";

export default function SmallCard(
  props: Hotel & { onPress?: (hotel: Hotel) => void }
) {
  const colorScheme = useColorScheme();
  const {
    gallery,
    name,
    location,
    userRating,
    price,
    currency,
    stars,
    onPress,
  } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={() =>
        onPress &&
        onPress({
          id: props.id,
          checkIn: props.checkIn,
          checkOut: props.checkOut,
          contact: props.contact,
          gallery,
          name,
          location,
          userRating,
          price,
          currency,
          stars,
        })
      }
    >
      <ImageBackground style={styles.image} source={{ uri: gallery[0] }}>
        <View style={[styles.box, { backgroundColor: "#fcba03" }]}>
          <FontAwesome name="star" color="#fff" size={12} />
          <Text
            semibold
            style={{
              fontSize: 10,
              textAlign: "right",
              color: "#fff",
            }}
          >
            {userRating}
          </Text>
        </View>
      </ImageBackground>
      <View>
        <Text bold>{name}</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <FontAwesome
            name="map-marker"
            color={Colors.light.primary}
            size={15}
            style={{ marginRight: 5 }}
          />
          <Text light style={{ fontSize: 12, color: "grey" }}>
            {location.address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "150@s",
    margin: 1,
  },
  image: {
    overflow: "hidden",
    position: "relative",
    borderRadius: 15,
    width: "100%",
    height: "220@vs",
    marginBottom: "8@vs",
    backgroundColor: "#fff",
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
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 5,
    width: "35@s",
    padding: "5@s",
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
