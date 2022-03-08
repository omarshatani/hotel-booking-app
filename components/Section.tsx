import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Text, View, ViewProps } from "./Themed";

export default function Section({
  title = "",
  containerStyle,
}: {
  title: string;
  containerStyle?: ViewProps;
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: { paddingVertical: "10@vs" },
  titleContainer: {
    marginBottom: "10@vs",
  },
  text: {
    fontSize: "15@s",
    fontWeight: "bold",
  },
});
