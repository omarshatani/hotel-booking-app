import React from "react";
import { TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { Text, View } from "./Themed";

export default function Avatar({ initials = "OS" }: { initials?: string }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{initials}</Text>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "35@s",
    height: "35@s",
    backgroundColor: Colors.light.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "35@s",
  },
  text: {
    color: Colors.light.background,
  },
});
