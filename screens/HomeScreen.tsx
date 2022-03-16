import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Text, View } from "../components/Themed";
import { Hotel, RootTabScreenProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import Section from "../components/Section";
import Searchbar from "../components/Seachbar";
import { getHotelsDetails } from "../api/hotels";
import HorizontalCardsList from "../components/HorizontalCardsList";
import { FlatList, ScrollView } from "react-native";
import LongCard from "../components/LongCard";
import Divider from "../components/Divider";

export default function HomeScreen(props: RootTabScreenProps<"Home">) {
  const navigation = useNavigation();
  const [hotels, setHotels] = React.useState<Hotel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response: Hotel[] = (await getHotelsDetails()).data;
        setHotels(response);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <View />; //TODO: migliorare gestione

  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      <Section
        title="Popular Hotels"
        containerStyle={{ paddingHorizontal: 0 }}
        titleContainerStyle={styles.titleContainerStyle}
      >
        <HorizontalCardsList data={hotels} />
      </Section>
      <Section
        title="Best offers"
        containerStyle={{ paddingHorizontal: 0 }}
        titleContainerStyle={styles.titleContainerStyle}
      >
        <FlatList
          data={hotels.sort((a, b) => a.price - b.price)}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Divider horizontal />}
          renderItem={({ item }) => <LongCard {...item} />}
          contentContainerStyle={styles.flatListStyle}
          scrollEnabled={false}
        />
      </Section>
    </ScrollView>
  );
}

const styles = ScaledSheet.create({
  container: {
    minHeight: "100%",
  },
  searchBar: {
    marginVertical: "12@vs",
  },
  titleContainerStyle: {
    paddingHorizontal: "20@s",
  },
  flatListStyle: {
    paddingVertical: "5@s",
    paddingHorizontal: "25@s",
  },
});
