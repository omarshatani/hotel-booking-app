import React from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Hotel } from "../types";
import Divider from "./Divider";
import SmallCard from "./SmallCard";
import { View } from "./Themed";

export default function HorizontalCardsList({
  data,
  contentContainerStyle,
  onPress,
}: {
  data: Hotel[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  onPress?: (hotel: Hotel) => void;
}) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SmallCard {...item} onPress={onPress} />}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <Divider vertical />}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      bounces={false}
    />
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: "5@s",
    paddingHorizontal: "20@s",
  },
});
