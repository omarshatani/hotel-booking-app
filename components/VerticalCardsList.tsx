import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Hotel } from "../types";
import Divider from "./Divider";
import LongCard from "./LongCard";
import { View } from "./Themed";

export default function VerticalCardsList({
  data,
  onPress,
}: {
  data: Hotel[];
  onPress?: (hotel: Hotel) => void;
}) {
  return (
    <>
      {data.map((hotel: Hotel, index: number) => (
        <React.Fragment key={hotel.id}>
          <LongCard {...hotel} onPress={onPress} />
          {index < data.length && <Divider horizontal />}
        </React.Fragment>
      ))}
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: "5@s",
    paddingHorizontal: "25@s",
  },
});
