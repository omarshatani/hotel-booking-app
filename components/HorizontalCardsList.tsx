import React from "react";
import { FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import SmallCard from "./SmallCard";
import { View } from "./Themed";

export default function HorizontalCardsList({ data }: any) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SmallCard {...item} />}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <Divider vertical />}
      contentContainerStyle={styles.container}
      bounces={false}
    />
  );
}

const Divider = ({
  horizontal,
  vertical,
}: {
  horizontal?: boolean;
  vertical?: boolean;
}) => {
  return (
    <View style={[vertical && { width: 15 }, horizontal && { height: 15 }]} />
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "10@s",
    paddingVertical: "5@s",
  },
});
