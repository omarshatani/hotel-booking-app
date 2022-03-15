import React, { PropsWithChildren, ReactChildren } from "react";
import { RegisteredStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Text, View, ViewProps } from "./Themed";

export default function Section({
  title = "",
  containerStyle,
  children,
}: {
  title: string;
  containerStyle?: RegisteredStyle<ViewProps & Record<never, number>>;
  children?: PropsWithChildren<any>;
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleContainer}>
        <Text style={styles.text} semibold>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: { paddingVertical: "10@vs" },
  titleContainer: {
    marginBottom: "10@vs",
    marginLeft: "10@s",
  },
  text: {
    fontSize: "14@s",
  },
});
