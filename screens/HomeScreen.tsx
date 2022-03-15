import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import Section from "../components/Section";
import Searchbar from "../components/Seachbar";
import { getHotelsDetails } from "../api/hotels";
import HorizontalCardsList from "../components/HorizontalCardsList";

export default function HomeScreen(props: RootTabScreenProps<"Home">) {
  const navigation = useNavigation();
  const [hotels, setHotels] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = (await getHotelsDetails()).data;
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
    <View style={styles.container}>
      <Searchbar containerStyle={styles.searchBar} />
      <Section title="Popular">
        <HorizontalCardsList data={hotels} />
      </Section>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    minHeight: "100%",
  },
  searchBar: {
    marginVertical: "12@vs",
    paddingHorizontal: "10@s",
  },
});
