import React, { PropsWithChildren, ReactChildren } from "react";
import { RegisteredStyle, StyleProp, ViewStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Text, View, ViewProps } from "./Themed";

export default function Section({
  title = "",
  containerStyle,
  titleContainerStyle,
  children,
}: {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  children?: PropsWithChildren<any>;
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.titleContainer, titleContainerStyle]}>
        <Text style={styles.text} semibold>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: { paddingVertical: "10@vs", paddingHorizontal: "20@s" },
  titleContainer: {
    marginBottom: "10@vs",
  },
  text: {
    fontSize: "14@s",
  },
});
