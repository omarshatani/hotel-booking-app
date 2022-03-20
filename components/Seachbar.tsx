import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { Platform, Pressable, RegisteredStyle, ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import Divider from "./Divider";
import { Text, TextInput, View, ViewProps } from "./Themed";

export type Filter = {
  label: string;
  value: string;
  order: "desc" | "asc";
};

export default function Searchbar({
  filterVisible = true,
  containerStyle,
  navigation,
}: {
  filterVisible?: boolean;
  containerStyle?: RegisteredStyle<ViewProps & Record<never, number>>;
} & NativeStackHeaderProps) {
  const colorScheme = useColorScheme();
  const [query, setQuery] = React.useState<string>("");
  const [show, setShow] = React.useState<boolean>(false);
  const [filters] = React.useState<Filter[]>([
    {
      label: "Price: descending",
      value: "price",
      order: "desc",
    },
    {
      label: "Price: ascending",
      value: "price",
      order: "asc",
    },
    {
      label: "Rating: descending",
      value: "rating",
      order: "desc",
    },
    {
      label: "Rating: ascending",
      value: "rating",
      order: "asc",
    },
  ]);
  const [selected, setSelected] = React.useState<Filter | undefined>();
  const handleSeach = (text: string) => {
    setQuery(text);
    navigation.setParams({
      query: text,
      filter: selected,
    });
  };
  return (
    <React.Fragment>
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.box, styles.shadow]}>
          <TextInput placeholder="Search" medium onChangeText={handleSeach} />
        </View>
        {filterVisible && (
          <Pressable
            android_ripple={{
              borderless: false,
            }}
            style={[
              styles.filterButton,
              styles.shadow,
              { backgroundColor: Colors.light.primary },
            ]}
            onPress={() => {
              setShow(!show);
              if (!show) {
                setSelected(undefined);
              }
            }}
          >
            <FontAwesome5
              name="filter"
              size={15}
              color={Colors[colorScheme].background}
            />
          </Pressable>
        )}
      </View>
      {show && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter: Filter, index) => (
            <React.Fragment key={filter.label}>
              <Pressable
                style={() => [
                  styles.filter_card,
                  { backgroundColor: selected === filter ? "#ededed" : "#fff" },
                ]}
                onPress={() => {
                  if (selected === filter) {
                    setSelected(undefined);
                  } else {
                    setSelected(filter);
                  }
                  navigation.setParams({
                    query,
                    filter,
                  });
                }}
              >
                <Text semibold style={{ fontSize: 10 }}>
                  {filter.label}
                </Text>
              </Pressable>
              {index < filters.length && <Divider vertical spacing={3} />}
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </React.Fragment>
  );
}

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 4,
  },
  box: {
    flexGrow: 1,
    paddingVertical: "10@vs",
    paddingHorizontal: "10@s",
    borderRadius: 10,
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "12@vs",
    paddingHorizontal: "12@s",
    borderRadius: 10,
    marginLeft: "10@s",
  },
  text: {
    fontSize: "12@s",
  },
  filter_card: {
    padding: "7@s",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
});
