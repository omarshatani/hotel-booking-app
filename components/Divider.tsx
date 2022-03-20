import React from "react";
import { View } from "./Themed";

const Divider = ({
  horizontal,
  vertical,
  color,
}: {
  horizontal?: boolean;
  vertical?: boolean;
  color?: string;
}) => {
  return (
    <View
      style={[
        vertical && { width: 1, marginHorizontal: 10 },
        horizontal && { height: 1, marginVertical: 10 },
        { backgroundColor: color ?? "transparent" },
      ]}
    />
  );
};

export default Divider;
