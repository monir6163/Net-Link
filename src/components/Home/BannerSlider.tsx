import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function BannerSlider() {
  const data = [
    {
      id: "1",
      image: require("../../../assets/img/b1.jpg"),
    },
  ];
  return (
    <Carousel
      loop
      width={width}
      height={width / 2}
      autoPlay={true}
      autoPlayInterval={5000}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
