import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Image, ImageBackground, Platform } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Hotel } from "../types";
import { getSignFromCurrency } from "../utils";
import { Text, View } from "./Themed";

export default function LongCard({
  gallery,
  name,
  location,
  userRating,
  price,
  currency,
  stars,
  ...rest
}: Hotel) {
  const colorScheme = useColorScheme();
  const [starsArray, setStarsArray] = React.useState<any[]>([]);

  React.useEffect(() => {
    const temp = [];
    for (let index = 0; index < stars; index++) {
      temp.push(
        <FontAwesome
          key={`${name}-${index}`}
          name="star"
          color="#fcba03"
          size={12}
          style={{ marginRight: 5 }}
        />
      );
    }
    setStarsArray(temp);
  }, []);

  return (
    <View style={[styles.container, styles.shadow]}>
      <Image source={{ uri: gallery[0] }} style={styles.image} />
      <View style={{ width: "70%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ width: "85%" }}>
            <Text
              bold
              style={{
                fontSize: 15,
                marginRight: 5,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              {starsArray}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <FontAwesome
              name="star"
              color="#fcba03"
              size={12}
              style={{ marginRight: 5 }}
            />
            <Text
              semibold
              style={{
                fontSize: 10,

                color: "#fcba03",
              }}
            >
              {userRating}
            </Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: 5,
          }}
        >
          <Text semibold style={{ fontSize: 18 }}>
            {getSignFromCurrency(currency)} {price}
          </Text>
          <Text style={{ fontSize: 11 }}>/night</Text>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
  },
  image: {
    height: "80@s",
    flexGrow: 1,
    borderRadius: 10,
    marginRight: 10,
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
