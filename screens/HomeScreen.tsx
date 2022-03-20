import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { View } from "../components/Themed";
import { Hotel, RootTabScreenProps } from "../types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Section from "../components/Section";
import { getHotelsDetails } from "../api/hotels";
import HorizontalCardsList from "../components/HorizontalCardsList";
import { ScrollView } from "react-native";
import VerticalCardsList from "../components/VerticalCardsList";
import AppLoading from "expo-app-loading";
import { setStatusBarStyle } from "expo-status-bar";

export default function HomeScreen({
  navigation,
  route,
}: RootTabScreenProps<"Home">) {
  const [popular, setPopular] = React.useState<Hotel[]>([]);
  const [bestOffers, setBestOffers] = React.useState<Hotel[]>([]);
  const [filteredData, setFilteredData] = React.useState<Hotel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response: Hotel[] = (await getHotelsDetails()).data;
        setFilteredData(response);
        setPopular(response);
        setBestOffers([...response].sort((a, b) => a.price - b.price));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (route.params?.query) {
      let regexp = new RegExp(route.params.query, "i");
      if (route.params?.query.length) {
        let filter = popular.filter((data: Hotel) => regexp.test(data.name));
        if (route.params?.filter) {
          switch (route.params.filter.value) {
            case "price":
              if (route.params.filter.order === "desc")
                setFilteredData(filter.sort((a, b) => b.price - a.price));
              else setFilteredData(filter.sort((a, b) => a.price - b.price));
              break;
            case "rating":
              if (route.params.filter.order === "desc")
                setFilteredData(
                  filter.sort((a, b) => a.userRating - b.userRating)
                );
              else
                setFilteredData(
                  filter.sort((a, b) => b.userRating - a.userRating)
                );
              break;
          }
        } else {
          setFilteredData(filter);
        }
      } else setFilteredData(popular);
    }
  }, [route.params?.query, route.params?.filter?.label]);

  useFocusEffect(
    React.useCallback(() => {
      setStatusBarStyle("auto");
    }, [])
  );

  if (loading) return <AppLoading />;

  if (route.params?.query) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Section title={`Search results for ${route.params.query}`}>
          <VerticalCardsList
            data={filteredData}
            onPress={(hotel: Hotel) =>
              navigation.navigate("HotelDetails", {
                hotel: hotel,
              })
            }
          />
        </Section>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Section
        title="Popular Hotels"
        containerStyle={{ paddingHorizontal: 0 }}
        titleContainerStyle={styles.titleContainerStyle}
      >
        <HorizontalCardsList
          data={popular.filter((_, index) => index < 5)}
          onPress={(hotel: Hotel) =>
            navigation.navigate("HotelDetails", {
              hotel: hotel,
            })
          }
        />
      </Section>
      <Section title="Best offers">
        <VerticalCardsList
          data={bestOffers}
          onPress={(hotel: Hotel) =>
            navigation.navigate("HotelDetails", {
              hotel: hotel,
            })
          }
        />
      </Section>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  container: {
    minHeight: "100%",
  },
  titleContainerStyle: {
    paddingHorizontal: "20@s",
  },
});
