import React from "react";
import { View } from "./Themed";

const Divider = ({
  horizontal,
  vertical,
}: {
  horizontal?: boolean;
  vertical?: boolean;
}) => {
  return (
    <View style={[vertical && { width: 20 }, horizontal && { height: 20 }]} />
  );
};

export default Divider;
