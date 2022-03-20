import { FontAwesome } from "@expo/vector-icons";
import { setStatusBarStyle } from "expo-status-bar";
import React from "react";
import { Image, ScrollView } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import Swiper from "react-native-swiper";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { RootTabScreenProps } from "../types";

export default function HotelDetails({
  navigation,
  route,
}: RootTabScreenProps<"HotelDetails">) {
  const { params } = route;
  const {
    hotel: {
      gallery,
      name,
      location,
      stars,
      price,
      userRating,
      checkIn,
      checkOut,
      contact,
      currency,
    },
  } = params;
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
    setStatusBarStyle("light");
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Swiper style={styles.swiper} activeDotColor="#fff">
        {gallery.map((image) => (
          <Image source={{ uri: image }} style={{ flex: 1 }} key={image} />
        ))}
      </Swiper>
      <View style={[styles.container]}>
        <View style={styles.title_section_container}>
          <View>
            <React.Fragment>
              <Text semibold style={styles.title}>
                {name}
              </Text>
              <View style={styles.stars}>{starsArray}</View>
            </React.Fragment>
            <View style={styles.address_container}>
              <FontAwesome
                name="map-marker"
                color={Colors.light.primary}
                size={15}
                style={{ marginRight: 5 }}
              />
              <Text light style={styles.address}>
                {location.address}
              </Text>
            </View>
          </View>
          <View style={styles.rating_container}>
            <View style={styles.rating}>
              <FontAwesome
                name="star"
                color="#fcba03"
                size={scale(15)}
                style={{ marginRight: 5 }}
              />
              <Text semibold style={styles.rating_text}>
                {userRating}
              </Text>
            </View>
            <Text medium>Users rating</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  swiper: {
    height: "300@vs",
  },
  container: {
    borderTopLeftRadius: "15@s",
    borderTopRightRadius: "15@s",
    marginTop: "-15@s",
    paddingVertical: "15@vs",
    paddingHorizontal: "20@s",
  },
  title_section_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "15@s",
    marginBottom: "5@vs",
    //marginVertical: "5@vs",
  },
  address_container: { flexDirection: "row", alignItems: "center" },
  address: {
    fontSize: 14,
    color: "grey",
  },
  stars: {
    flexDirection: "row",
    marginBottom: "5@vs",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating_text: {
    fontSize: "15@s",
    color: "#fcba03",
  },
  rating_container: {
    alignItems: "center",
  },
});
